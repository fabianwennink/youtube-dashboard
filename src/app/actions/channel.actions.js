import {arrayMove} from 'react-sortable-hoc';
import {storageGet, storageSet} from '../utils/storage';

export const CHANNELS_SORTED = 'CHANNELS_SORTED';
export const LOAD_CHANNEL_ORDER = 'LOAD_CHANNEL_ORDER';

const STORAGE_ORDER_LIST = 'channelOrder'

export function channelsSorted(channels, oldIndex, newIndex) {
    return function (dispatch) {
        const list = arrayMove(channels, oldIndex, newIndex);
        const idList = list.map(channel => channel.id);

        storageSet(STORAGE_ORDER_LIST, idList.join(','));
        dispatch({type: CHANNELS_SORTED, data: {list}});
    };
}

export function loadChannelOrder() {
    return function (dispatch) {
        let list = storageGet(STORAGE_ORDER_LIST);
        if(list) {
            list = list.split(',');
            dispatch({type: LOAD_CHANNEL_ORDER, data: {list}});
        }
    };
}
