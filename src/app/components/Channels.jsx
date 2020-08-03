import * as React from 'react';
import {connect} from 'react-redux';

import Channel from './channel/Channel';
import NoChannels from './NoChannels';

class Channels extends React.Component {

    render() {
        const hasChannels = this.props.channels.length > 0;
        const isLoadingChannels = hasChannels && this.props.loadingChannels > 0;

        return (
            <div className={'container row channels'}>
                {
                    (isLoadingChannels)
                        ? <div className={'loader'} />
                        : (hasChannels)
                            ? this.props.channels.map(channel => <Channel key={channel.id} data={channel} />)
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
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
