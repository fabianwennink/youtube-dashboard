import * as React from 'react';
import {connect} from 'react-redux';

class ChannelHeader extends React.Component {

    constructor(props) {
        super(props);

        this.channelId = this.props.id;
        this.channelName = this.props.name;
    }

    render() {
        return (
            <div className={'channel__header'}>
                <a className={'channel__title'} href={'https://www.youtube.com/channel/' + this.channelId}
                    target={'_blank'}
                    rel={'nofollow noreferrer noopener'}>
                    {this.channelName}
                </a>
                {/*<span className={'drag-button button ui-sortable-handle'}>move</span>*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChannelHeader);
