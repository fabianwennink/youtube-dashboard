import {produce} from 'immer';
import {FETCH_CHANNEL_VIDEOS, FETCHED_CHANNEL_VIDEOS} from '../middleware/api.actions';
import {safeArray} from '../utils/mutation-util';

const INITIAL_STATE = Object.freeze({
    list: [
        // {
        //     id: 'UCBR8-60-B28hp2BmDPdntcQ', // YouTube
        //     title: '',
        //     videos: [],
        //     position: 1
        // },
        // {
        //     id: 'UCkRfArvrzheW2E7b6SVT7vQ', // YouTube Creators
        //     title: '',
        //     videos: [],
        //     position: 2
        // },
        // {
        //     id: 'UCMDQxm7cUx3yXkfeHa5zJIQ', // YouTube Help
        //     title: '',
        //     videos: [],
        //     position: 3
        // },
        // {
        //     id: 'UCEN58iXQg82TXgsDCjWqIkg', // YouTube Advertisers
        //     title: '',
        //     videos: [],
        //     position: 4
        // },
        // {
        //     id: 'UCK8sQmJBp8GCxrOtXWBpyEA', // Google
        //     title: '',
        //     videos: [],
        //     position: 5
        // }
    ],
    loadingChannels: 0
});

export const channelReducer = (state = INITIAL_STATE, action) =>
    produce(state, draft => {
        switch (action.type) {
            case FETCH_CHANNEL_VIDEOS:
                draft.loadingChannels = state.loadingChannels + 1;
                return;
            case FETCHED_CHANNEL_VIDEOS:
                addVideos(draft, action.data);
                draft.loadingChannels = state.loadingChannels - 1;
                return;
            default:
                return state;
        }
    });

function addVideos(draft, data) {
    const channel = safeArray(draft.list).find(item => item.id === data.channelId);
    channel.set('title', data.response.title)

    const videos = [];

    // Loop videos
    data.response.videos.forEach(video => {
        videos.push({
            id: video.id,
            title: video.title,
            publishedAt: video.publishedAt
        });
    });

    channel.set('videos', videos);
}
