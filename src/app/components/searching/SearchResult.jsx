import * as React from 'react';
import {connect} from 'react-redux';
import SearchedChannel from './SearchedChannel';

class SearchResult extends React.Component {

    render() {
        const foundResults = this.props.searchResult.length > 0;

        return (
            <div className={'container row channel-search'}>
                <div>
                    <span>Back to overview</span>
                </div>

                {
                    foundResults ? this.props.searchResult.map(item => {
                        return <SearchedChannel
                            key={`search-${item.id}`}
                            id={item.id}
                            title={item.title}
                            thumbnail={item.thumbnail} />;
                    }) : <p>No channels found with the given search term.</p>
                }
            </div>
        )
    }
}

// ------- REDUX -------

const mapStateToProps = (state) => {
    return {
        searchResult: state.searching.searchResult
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
