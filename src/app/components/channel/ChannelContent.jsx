import * as React from 'react';
import {connect} from 'react-redux';
import Video from './video/Video';

class ChannelContent extends React.Component {

    render() {
        const channelName = this.props.name;
        const channelVideos = this.props.videos;

        return (
            <div className={'channel__inner'}>
                <div className={'channel__videos'}>
                    {
                        channelVideos.map(video => {
                            return <Video
                                key={`${video.id}`}
                                id={video.id}
                                title={video.title}
                                channel={channelName}
                                date={video.publishedAt} />
                        })
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChannelContent);
