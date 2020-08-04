import * as React from 'react';
import {connect} from 'react-redux';

import NoChannels from '../main/NoChannels';
import ChannelContainer from './sortable/ChannelContainer';
import {channelsSorted} from '../../actions/channel.actions';

class Channels extends React.Component {

    onSortEnd = ({oldIndex, newIndex}) => {
        this.props.channelsSorted(this.props.channels, oldIndex, newIndex)
    }

    render() {
        const hasChannels = this.props.channels.length > 0;
        const isLoadingChannels = hasChannels && this.props.loadingChannels > 0;

        return (
            <div className={'container row channels'}>
                {
                    (isLoadingChannels)
                        ? <div className={'loader'} />
                        : (hasChannels)
                            ? <ChannelContainer axis={'xy'} useDragHandle channels={this.props.channels} onSortEnd={this.onSortEnd} />
                            : <NoChannels />
                }
            </div>
        )
    }
}

// ------- REDUX -------

const mapStateToProps = (state) => {
    return {
        channels: state.channel.list,
        loadingChannels: state.channel.loadingChannels
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        channelsSorted: (channels, oldIndex, newIndex) => dispatch(channelsSorted(channels, oldIndex, newIndex))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
