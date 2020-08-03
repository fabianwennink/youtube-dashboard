import * as Redux from 'redux';
import {channelReducer} from './channel.reducer';
import {settingsReducer} from './settings.reducer';
import {playerReducer} from './player.reducer';
import {searchingReducer} from './searching.reducer';

export const reducers = Redux.combineReducers({
    channel: channelReducer,
    settings: settingsReducer,
    player: playerReducer,
    searching: searchingReducer
});

export const logger = (store) => (next) => (action) => {
    console.log('BEFORE:', action.type, store.getState());
    const state = next(action);
    console.log('AFTER:', action.type, store.getState());
    return state;
};
