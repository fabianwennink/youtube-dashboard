import * as React from 'react';
import {connect} from 'react-redux';
import YouTubeSearch from '../../../assets/images/search.svg';
import {setSearchTerm, startSearching} from '../../actions/searching.actions';

class HeaderSearchBox extends React.Component {

    searchTermEditAction = (event) => {
        this.props.setSearchTerm(event.target.value);
    }

    enterKeyAction(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.submitSearchTerm();
        }
    }

    submitSearchTerm = () => {
        this.props.startSearching();
    }

    render() {
        const hasAPIKey = this.props.apiKey.length > 0;

        return (
            <div className={'col-8-l'}>
                {
                    (hasAPIKey) ? (
                        <div className={'search'}>
                            <input className={'search__input'} type={'text'} placeholder={'Search channel'}
                                   onChange={(event) => this.searchTermEditAction(event)}
                                   onKeyPress={event => this.enterKeyAction(event)} />
                            <button className={'search__button button'} onClick={this.submitSearchTerm}>
                                <img alt={'Search icon'} className={'search__icon'} src={YouTubeSearch} />
                            </button>
                        </div>
                    ) : <></>
                }
            </div>
        );
    }
}

// ------- REDUX -------

const mapStateToProps = (state) => {
    return {
        isSearching: state.searching.isSearching,
        searchTerm: state.searching.searchTerm,
        apiKey: state.settings.apiKey
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchTerm: (value) => dispatch(setSearchTerm(value)),
        startSearching: () => dispatch(startSearching())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchBox);
