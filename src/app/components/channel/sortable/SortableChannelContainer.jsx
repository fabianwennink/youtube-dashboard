import * as React from 'react';
import {SortableElement} from 'react-sortable-hoc';
import Channel from '../Channel';

const SortableChannelContainer = SortableElement((props) => {
    return (
        <div className={'col-6-l'}>
            <Channel key={props.channel.id} data={props.channel} />
        </div>
    )
});

export default SortableChannelContainer;
