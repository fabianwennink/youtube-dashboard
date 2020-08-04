import * as React from 'react';
import {connect} from 'react-redux';
import {setApiKey} from '../../actions/settings.actions';

class NoAPIKey extends React.Component {

    enterKeyAction(event) {
        console.log('test', event.target.value)
        if (event.key === 'Enter') {
            event.preventDefault();
            this.props.setApiKey(event.target.value);
        }
    }

    render() {
        return (
            <div className={'container row started'}>
                <p>To get started, please enter your Google API key into the field below.</p>
                <div className={'started__key'}>
                    <input placeholder={'Google API Key'} type={'text'} className={'started__key-input'}
                           spellCheck={false} autoComplete={false}
                           onKeyPress={event => this.enterKeyAction(event)} />
                </div>
                <p className={'started__help'}>
                    Need help creating an API key? Visit the <a href={'https://support.google.com/googleapi/answer/6158862?hl=en'}>Google Support page</a> for more instructions.
                    <br/>
                    You can always change the API key at a later point. RSS will be used as a fallback if the API quota is reached.
                </p>
            </div>
        )
    }
}

// ------- REDUX -------

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        setApiKey: (key) => dispatch(setApiKey(key))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NoAPIKey);
