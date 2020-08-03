import * as React from 'react';
import {connect} from 'react-redux';

import Footer from './footer/Footer';
import VideoPlayer from './videoplayer/VideoPlayer';
import Header from './header/Header';
import {apiFetchChannelVideos} from '../middleware/api.actions';
import Menu from './menu/Menu';
import Channels from './Channels';
import SearchResult from './SearchResult';
import NoAPIKey from './NoAPIKey';

class App extends React.Component {

    componentDidMount() {
        for(const channel of this.props.channels) {
            this.props.fetchChannelVideos(channel.id);
        }
    }

    render() {
        const hasAPIKey = this.props.apiKey.length > 0;

        return (
            <div id={'wrapper'}>
                <Header />

                <div id={'content'}>
                    {
                        (hasAPIKey)
                            ? ((this.props.isSearching) ? <SearchResult /> : <Channels />)
                            : <NoAPIKey />
                    }
                </div>

                <Footer />
                <VideoPlayer />
                <Menu />
            </div>
        )
    }
}

// ------- REDUX -------

const mapStateToProps = (state) => {
    return {
        apiKey: state.settings.apiKey,
        channels: state.channel.list,
        isSearching: state.searching.isSearching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchChannelVideos: (channelId) => dispatch(apiFetchChannelVideos(channelId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
