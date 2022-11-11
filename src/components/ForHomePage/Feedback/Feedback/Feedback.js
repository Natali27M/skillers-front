import React from 'react';

import css from './Feedback.module.css';


const Feedback = ({feedback}) => {

    const text = (text) => {
        const newText = text.slice(0, 260);
        const arrayOf = newText.split(' ');
        return `${arrayOf.slice(1, arrayOf.length - 1).join(' ')}...`;
    };

    return (
        <div className={css.feedback__block}>

            <div className={css.feedback__title}>
                {feedback?.attributes.userName}
            </div>

            <div className={css.feedback__text}>
                <q>
                    {feedback.attributes?.message.length >= 260
                        ?
                        text(feedback?.attributes.message)
                        :
                        feedback?.attributes?.message
                    }
                </q>
            </div>
        </div>
    );
};

export {Feedback};
