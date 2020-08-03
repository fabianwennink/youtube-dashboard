import {apiFetchSearchedChannels} from '../middleware/api.actions';

export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const START_SEARCHING = 'START_SEARCHING';
export const STOP_SEARCHING = 'STOP_SEARCHING';

export function setSearchTerm(value) {
    return {type: SET_SEARCH_TERM, data: {value}}
}

export function startSearching() {
    return function (dispatch) {
        dispatch(apiFetchSearchedChannels());
        dispatch({type: START_SEARCHING});
    };
}

export function stopSearching() {
    return {type: STOP_SEARCHING}
}
