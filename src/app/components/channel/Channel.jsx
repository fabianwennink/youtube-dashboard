import * as React from 'react';
import {connect} from 'react-redux';
import ChannelHeader from './ChannelHeader';
import ChannelContent from './ChannelContent';

class Channel extends React.Component {

    render() {
        const channelId = this.props.data.id;
        const channelName = this.props.data.title;
        const channelVideos = this.props.data.videos;

        return (
            <div className={'channel col-6-l col-6-m col-12-s'} data-id={channelId}>
                <ChannelHeader id={channelId} name={channelName} />
                <ChannelContent id={channelId} name={channelName} videos={channelVideos} />
            </div>
        );
    }
}

// ------- REDUX -------

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
