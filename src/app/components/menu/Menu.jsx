import * as React from 'react';
import {connect} from 'react-redux';

class Menu extends React.Component {

    render() {
        return (
            <div id={'menu'}>

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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

