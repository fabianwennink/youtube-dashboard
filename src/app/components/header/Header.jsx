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

                    <div className={'col-2-l'}>
                        <div className={'header-icon'}>
                            <i className={'db-icon-cog'} title={'Settings'}/>
                        </div>

                        {
                            (!this.props.isSearching)
                                ? <div className={'header-icon'}>
                                    <i className={'db-icon-refresh'} title={'Refresh'}/>
                                </div>
                                : <></>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

// ------- REDUX -------

const mapStateToProps = (state) => {
    return {
        isSearching: state.searching.isSearching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

