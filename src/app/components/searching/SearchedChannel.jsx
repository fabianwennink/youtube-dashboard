import * as React from 'react';
import {connect} from 'react-redux';

class SearchedChannel extends React.Component {

    render() {
        const channelId = this.props.id;
        const channelName = this.props.title;
        const channelThumbnail = this.props.thumbnail;

        return (
            <div className={'search-result col-3-l'}>
                <div className={'search-result__thumbnail'}>
                    <img src={channelThumbnail} alt={channelName} title={channelName} referrerPolicy={'no-referrer'} />
                </div>
                <div className={'search-result__details'}>
                    <div className={'search-result__title'}>
                        <span>{channelName}</span>
                    </div>
                    <div className={'search-result__id'}>
                        <span>{channelId}</span>
                    </div>
                    <div className={'search-result__button'}>

                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchedChannel);
