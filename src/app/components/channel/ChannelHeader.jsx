import * as React from 'react';
import {connect} from 'react-redux';
import DragHandle from './sortable/ChannelDragHandle';

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
                <DragHandle/>
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
