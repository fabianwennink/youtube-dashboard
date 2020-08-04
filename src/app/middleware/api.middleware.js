import {
    apiFetchChannelVideosFailed,
    apiFetchedChannelVideos, apiFetchedSearchedChannels,
    FETCH_CHANNEL_VIDEOS, FETCH_SEARCHED_CHANNELS,
} from './api.actions';
import {API_MODES} from '../actions/settings.actions';
import {quickFetch} from '../utils/quick-fetch';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId={0}&order=date&key={1}&maxResults={2}&type=video';
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q={0}&type=channel&order=relevance&key={1}&maxResults={2}';
const YOUTUBE_RSS_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id={0}';

export const apiMiddleware = (store) => (next) => (action) => {

    const getChannelVideos = (key, mode, channelId, maxVideos) => {
        if(mode === API_MODES.API) {
            const url = String.format(YOUTUBE_API_URL, channelId, key, maxVideos);
            quickFetch(url, 'GET', {}, (response) => {

                const formattedResponse = {
                    title: response.items[0].snippet.channelTitle,
                    videos: response.items.map(video => {
                        return {
                            id: video.id.videoId,
                            title: video.snippet.title,
                            publishedAt: video.snippet.publishedAt
                        }
                    })
                };

                store.dispatch(apiFetchedChannelVideos(channelId, formattedResponse));
            }, () => store.dispatch(apiFetchChannelVideosFailed(channelId)));
        } else if(mode === API_MODES.RSS) {
            // const url = String.format(YOUTUBE_RSS_URL, channelId);
            // quickFetch(url, 'GET', {}, (response) => {
            //
            //     const formattedResponse = {
            //         title: response.items[0].snippet.channelTitle,
            //         videos: response.items.map(video => {
            //             return {
            //                 id: video.id.videoId,
            //                 title: video.snippet.title,
            //                 publishedAt: video.snippet.publishedAt
            //             }
            //         })
            //     };
            //
            //
            //
            //     store.dispatch(apiFetchedChannelVideos(channelId, response));
            // }, () => store.dispatch(apiFetchChannelVideosFailed(channelId)));
        }
        return null;
    }

    const searchChannels = (key, searchTerm, maxVideos) => {
        const url = String.format(YOUTUBE_SEARCH_URL, searchTerm, key, maxVideos);
        quickFetch(url, 'GET', {}, (response) => {
            console.log(response.items)
            const formattedResponse = response.items.map(item => {
                return {
                    id: item.snippet.channelId,
                    title: item.snippet.channelTitle,
                    thumbnail: item.snippet.thumbnails.default.url
                }
            });

            store.dispatch(apiFetchedSearchedChannels(formattedResponse));
        });
    }

    const state = store.getState();

    switch (action.type) {
        case FETCH_CHANNEL_VIDEOS:
            getChannelVideos(state.settings.apiKey, state.settings.fetchMode, action.data.channelId, state.settings.maxChannelVideos);
            break;
        case FETCH_SEARCHED_CHANNELS:
            searchChannels(state.settings.apiKey, state.searching.searchTerm, state.settings.maxSearchVideos);
            break;
        default:
            break;
    }

    return next(action);
};

// Adds support for string formatting.
String.format = function() {
    let theString = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        const regEx = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        theString = theString.replace(regEx, arguments[i]);
    }
    return theString;
};
