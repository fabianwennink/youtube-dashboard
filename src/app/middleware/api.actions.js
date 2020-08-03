export const FETCH_CHANNEL_VIDEOS = 'FETCH_CHANNEL_VIDEOS';
export const FETCHED_CHANNEL_VIDEOS = 'FETCHED_CHANNEL_VIDEOS';
export const FETCH_CHANNEL_VIDEOS_FAILED = 'FETCH_CHANNEL_VIDEOS_FAILED';

export const FETCH_SEARCHED_CHANNELS = 'FETCH_SEARCHED_CHANNELS';
export const FETCHED_SEARCHED_CHANNELS = 'FETCHED_SEARCHED_CHANNELS';

export function apiFetchChannelVideos(channelId) {
    return { type: FETCH_CHANNEL_VIDEOS, data: { channelId } };
}

export function apiFetchedChannelVideos(channelId, response) {
    return { type: FETCHED_CHANNEL_VIDEOS, data: { channelId, response } };
}

export function apiFetchChannelVideosFailed(channelId) {
    return { type: FETCH_CHANNEL_VIDEOS_FAILED, data: { channelId } };
}

export function apiFetchSearchedChannels() {
    return { type: FETCH_SEARCHED_CHANNELS };
}

export function apiFetchedSearchedChannels(response) {
    return { type: FETCHED_SEARCHED_CHANNELS, data: { response } };
}

