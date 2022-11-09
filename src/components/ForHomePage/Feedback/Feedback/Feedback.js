import React from 'react';

import css from './Feedback.module.css';


const Feedback = ({feedback}) => {

    const text = (text) => {
        return text.slice(0, 260);
    }

    return (
        <div className={css.feedback__block}>

            <div className={css.feedback__title}>
                {feedback?.attributes.userName}
            </div>

            <div className={css.feedback__text}>
                {text(feedback?.attributes.message)}
            </div>
        </div>
    );
};

export {Feedback};
