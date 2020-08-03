import {produce} from 'immer';
import {PLAY_VIDEO, STOP_VIDEO} from '../actions/player.actions';

const INITIAL_STATE = Object.freeze({
    active: false,
    video: {
        id: '',
        title: ''
    }
});

export const playerReducer = (state = INITIAL_STATE, action) =>
    produce(state, draft => {
        switch (action.type) {
            case PLAY_VIDEO:
                draft.active = true;
                draft.video.id = action.data.id;
                draft.video.title = action.data.title;
                return;
            case STOP_VIDEO:
                draft.active = false;
                draft.video.id = '';
                draft.video.title = '';
                return;
            default:
                return state;
        }
    });
