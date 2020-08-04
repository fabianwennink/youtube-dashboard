import * as React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import SortableChannelContainer from './SortableChannelContainer';

const ChannelContainer = SortableContainer((props) => {
    return (
        <div className={'channel-container'}>
            {props.channels.map((channel, index) => <SortableChannelContainer key={index} channel={channel} index={index} />)}
        </div>
    )
});

export default ChannelContainer;
