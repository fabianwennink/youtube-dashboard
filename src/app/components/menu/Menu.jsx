import * as React from 'react';
import {connect} from 'react-redux';

class Menu extends React.Component {

    render() {
        return (
            <div id={'menu'}>

                {
                    // remove api key
                    // max videos
                    // search max results
                    // clear all channels
                    // lock moving
                    // easy import /export channels
                }

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

