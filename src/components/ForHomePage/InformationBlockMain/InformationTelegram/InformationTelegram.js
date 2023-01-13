import React from 'react';

import css from '../InformationTesting/InformationTesting.module.css';
import cssThis from '../InformationCollaboration/InformationCollaboration.module.css';
import telegram from '../../../../images/information/telegramChat.png';

const InformationTelegram = () => {
    return (
        <div className={css.testing__main}>
            <img src={telegram} alt="testing" className={cssThis.testing__img}/>

            <div className={css.testing__text_box}>
                <h4 className={css.testing__header}>Telegram bot</h4>

                <h5 className={css.testing__small_header}>Chat is an opportunity to communicate anywhere.</h5>

                <p className={css.testing__description}>
                    Here you can choose a technology and conduct testing according to the level of difficulty.
                </p>
            </div>
        </div>
    );
};

export {InformationTelegram};
