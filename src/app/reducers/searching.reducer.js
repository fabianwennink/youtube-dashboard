import {produce} from 'immer';
import {SET_SEARCH_TERM, START_SEARCHING, STOP_SEARCHING} from '../actions/searching.actions';
import {FETCHED_SEARCHED_CHANNELS} from '../middleware/api.actions';

const INITIAL_STATE = Object.freeze({
    searchTerm: '',
    searchResult: [],
    isSearching: false
});

export const searchingReducer = (state = INITIAL_STATE, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_SEARCH_TERM:
                draft.searchTerm = action.data.value;
                return;
            case START_SEARCHING:
                draft.isSearching = true;
                return;
            case STOP_SEARCHING:
                draft.isSearching = false;
                draft.searchTerm = '';
                draft.searchResult = [];
                return;
            case FETCHED_SEARCHED_CHANNELS:
                draft.searchResult = action.data.response
                return;
            default:
                return state;
        }
    });
