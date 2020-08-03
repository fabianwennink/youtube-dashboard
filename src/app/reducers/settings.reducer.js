import {produce} from 'immer';
import {
    API_MODES,
    SET_API_KEY,
    SET_FETCH_MODE,
    SET_MAX_CHANNEL_VIDEOS,
    SET_MAX_SEARCH_VIDEOS
} from '../actions/settings.actions';

const INITIAL_STATE = Object.freeze({
    apiKey: '',
    fetchMode: API_MODES.API,
    maxChannelVideos: 4,
    maxSearchVideos: 12,
});

export const settingsReducer = (state = INITIAL_STATE, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_API_KEY:
                draft.apiKey = action.data.key;
                return;
            case SET_FETCH_MODE:
                draft.fetchMode = action.data.mode;
                return;
            case SET_MAX_CHANNEL_VIDEOS:
                draft.maxChannelVideos = action.data.amount;
                break;
            case SET_MAX_SEARCH_VIDEOS:
                draft.maxSearchVideos = action.data.amount;
                break;
            default:
                return state;
        }
    });
