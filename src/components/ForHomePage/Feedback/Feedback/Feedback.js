import React from 'react';

import css from './Feedback.module.css';


const Feedback = ({feedback}) => {

    return (
        <div className={css.feedback__block}>

            <div className={css.feedback__title}>
                {feedback?.attributes.userName}
            </div>

            <div className={css.feedback__text}>
                {feedback?.attributes.message}
            </div>
        </div>
    );
};

export {Feedback};
