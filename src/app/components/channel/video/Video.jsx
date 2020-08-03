import * as React from 'react';
import {connect} from 'react-redux';
import {playVideo} from '../../../actions/player.actions';

class Video extends React.Component {

    constructor(props) {
        super(props);

        this.videoId = this.props.id;
        this.videoTitle = this.props.title;
        this.videoDate = this.props.date;
        this.channelName = this.props.channel;
    }

    /**
     * 	Formats the video's timestamp to a readable date.
     *
     *	@param {Date} current - The current date.
     *	@param {Date} previous - The video's date.
     */
    timeDifference = (current, previous) => {
        const elapsed = (current.getTime() - previous.getTime()) / 1000;

        if (elapsed < 60) {
            return elapsed + ' seconds ago';
        } else if (elapsed < 3600) {
            return Math.round(elapsed / 60) + ' minutes ago';
        } else if (elapsed < 86400 ) {
            return Math.round(elapsed / 3600 ) + ' hours ago';
        } else if (elapsed < 604800) {
            return Math.round(elapsed / 86400) + ' days ago';
        } else if (elapsed < 2592000) {
            return Math.round(elapsed / 604800) + ' weeks ago';
        } else if (elapsed < 31536000) {
            return Math.round(elapsed / 2592000) + ' months ago';
        } else {
            return Math.round(elapsed / 31536000) + ' years ago';
        }
    }

    playVideoAction = () => {
        if(!this.props.playerActive) {
            if(window.screen.width <= 768) {
                window.location = 'https://youtu.be/' + this.videoId;
            } else {
                this.props.playVideo(this.videoId, this.videoTitle);
            }
        }
    };

    render() {
        const publishDate = new Date(this.videoDate);
        const currentDate = new Date();

        // A 'new' video is a video published up to max 5 days ago.
        const isNewVideo = (currentDate.getTime() - publishDate.getTime()) / 1000 < 432000; // TODO configurable?

        return (
            <div className={'video'} onClick={this.playVideoAction}>
                <div className={'video__image'}>
                    <img className={'video__thumb'} alt={'Video Thumbnail'}
                         src={'https://i.ytimg.com/vi/' + this.videoId + '/mqdefault.jpg'} />
                </div>
                <div className={'video__details'}>
                    <span className={'video__title'}>{this.videoTitle}</span>
                    <span className={'video__channel'}>{this.channelName}</span>
                    <span className={'video__published'}>Published {this.timeDifference(currentDate, publishDate)}</span>
                    { isNewVideo ? <div className={'new-badge'}>New</div> : <></> }
                </div>
            </div>
        );
    }
}

// ------- REDUX -------

const mapStateToProps = (state) => {
    return {
        playerActive: state.player.active
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        playVideo: (id, title) => dispatch(playVideo(id, title))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
