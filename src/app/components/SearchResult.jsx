import * as React from 'react';
import {connect} from 'react-redux';

class SearchResult extends React.Component {

    render() {
        return (
            <div className={'container row search'}>
                <div className={'channel__search'} />
            </div>
        )
    }
}

// ------- REDUX -------

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
