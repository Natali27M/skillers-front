import React from 'react';

import css from '../InformationTesting/InformationTesting.module.css';
import cssThis from './InformationCollaboration.module.css';
import collaboration from '../../../../images/information/collaboration.png';

const InformationCollaboration = () => {
    return (
        <div className={css.testing__main}>
            <img src={collaboration} alt="testing" className={cssThis.testing__img}/>

            <div className={css.testing__text_box}>
                <h4 className={css.testing__header}>Collaborative programming</h4>

                <h5 className={css.testing__small_header}>Teamwork is always more effective.</h5>

                <p className={css.testing__description}>
                    Write code together, track changes in real time, solve problems and bugs together too, with online
                    coding from SKILLIANT.
                </p>
            </div>
        </div>
    );
};

export {InformationCollaboration};
