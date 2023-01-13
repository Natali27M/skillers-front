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

                <h5 className={css.testing__small_header}>Telegram bot makes it possible to pass tests without
                    logging in to the site.
                </h5>

                <p className={css.testing__description}>
                    In it you have access to all those tests that you can find on the site.
                </p>
            </div>
        </div>
    );
};

export {InformationTelegram};
