import React from 'react';
import {useNavigate} from "react-router-dom";

import css from './Question.module.css';
import user from '../../../../images/user.svg'

const Question = ({question}) => {
    const navigate = useNavigate();


    return (
        <div className={css.question_container} onClick={() => navigate(`/community/question/${question.id}`)}>
            <div className={css.question_title}>
                {question.attributes.title}
            </div>
            <div className={css.question_description}>
                {
                    question.attributes?.description?.length > 140 ? `${question.attributes.description.slice(0, 140)}` + '...' : question.attributes.description
                }
            </div>
            <div className={css.question_technologies}>
                {
                    question?.attributes.technologies?.data?.length && question?.attributes.technologies?.data.map(value =>
                        <div key={value.id} className={css.technology}>
                            {value.attributes.value}
                        </div>
                    )
                }
            </div>
            <div className={css.question_user}>
                <img src={user} alt="user"/>
                <div className={css.question_user_name}>{question.attributes.userName}</div>
            </div>
        </div>
    );
};

export {Question};
