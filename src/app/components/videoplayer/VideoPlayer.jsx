import * as React from 'react';
import {connect} from 'react-redux';
import {stopVideo} from '../../actions/player.actions';

class VideoPlayer extends React.Component {

    closePlayerAction = () => {
        this.props.stopVideo()
    }

    render () {
        const showPlayer = this.props.playerActive;
        return showPlayer ? <div className={'video-player'}>
            <div className={'video-player__background'} onClick={this.closePlayerAction} />
            <div className={'video-player__wrapper'}>
                <iframe className={'video-player__frame'}
                        src={`https://www.youtube.com/embed/${this.props.playerDetails.id}?autoplay=1`}
                        frameBorder={0} autoPlay allowFullScreen title={'YouTube Video Player'}/>
                <span className={'video-player__title'}>
                    <a href={`https://youtube.com/watch?v=${this.props.playerDetails.id}`}>
                        {this.props.playerDetails.title}
                    </a>
                </span>
            </div>
        </div> : <></>;
    }
}

// ------- REDUX -------

const mapStateToProps = (state) => {
    return {
        playerActive: state.player.active,
        playerDetails: state.player.video
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        stopVideo: () => dispatch(stopVideo())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
