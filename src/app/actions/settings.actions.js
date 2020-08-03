import {storageGet, storageSet} from '../utils/storage';

export const SET_API_KEY = 'SET_API_KEY';
export const SET_FETCH_MODE = 'SET_FETCH_MODE';
export const SET_MAX_CHANNEL_VIDEOS = 'SET_MAX_CHANNEL_VIDEOS';
export const SET_MAX_SEARCH_VIDEOS = 'SET_MAX_SEARCH_VIDEOS';

export const API_MODES = Object.freeze({
    API: 'API',
    RSS: 'RSS'
})

export function setApiKey(key) {
    return function (dispatch) {
        storageSet('API_KEY', key);
        dispatch( { type: SET_API_KEY, data: { key } });
    };
}

export function loadApiKey() {
    return function (dispatch) {
        const key = storageGet('API_KEY');
        if(key) {
            dispatch(setApiKey(key));
        }
    };
}

export function setFetchMode(mode) {
    const _mode = (mode === API_MODES.RSS || mode === API_MODES.API) ? mode : API_MODES.API;
    return { type: SET_FETCH_MODE, data: { _mode } };
}

export function setMaxChannelVideos(amount) {
    const _amount = Number(amount)
    return { type: SET_MAX_CHANNEL_VIDEOS, data: { _amount } };
}

export function setMaxSearchVideos(amount) {
    const _amount = Number(amount)
    return { type: SET_MAX_SEARCH_VIDEOS, data: { _amount } };
}
