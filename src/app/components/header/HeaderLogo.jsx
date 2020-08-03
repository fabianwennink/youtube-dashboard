import * as React from 'react';
import YouTubeLogo from '../../../assets/images/youtube-logo.svg';

function HeaderLogo() {
    return (
        <div className={'col-2-l'}>
            <a href={'https://youtube.com'} target={'_blank'} rel={'nofollow noopener noreferrer'}>
                <img alt={'YouTube'} title='YouTube' className={'logo'} src={YouTubeLogo} />
            </a>
        </div>
    )
}

export default HeaderLogo;
