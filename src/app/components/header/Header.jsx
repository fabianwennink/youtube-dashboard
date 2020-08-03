import * as React from 'react';
import {connect} from 'react-redux';

import HeaderLogo from './HeaderLogo';
import HeaderSearchBox from './HeaderSearchBox';

class Header extends React.Component {

    render() {
        return (
            <div id={'header'}>
                <div className={'container row'}>
                    <HeaderLogo />
                    <HeaderSearchBox />

                    <div className="col-2-l">
                        <div className="header-icon"><i className="db-icon-cog" data-func="settings"></i></div>
                        <div className="header-icon"><i className="db-icon-rss" data-func="rss-toggle"></i></div>
                        <div className="header-icon"><i className="db-icon-refresh" data-func="refresh"></i></div>
                        <div className="stop-searching hide button">Stop searching</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);

