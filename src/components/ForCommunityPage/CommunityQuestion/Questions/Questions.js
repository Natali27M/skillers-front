import React from 'react';


import css from './Questions.module.css';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Questions = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const navigate = useNavigate();

    return (
        <div className={css.container}>
            <div className={css.questions__container}>
                <div className={css.top_ack__block}>
                    <h3>{EN ? "All question" : "Всі запитання"}</h3>
                    <button className={css.ask__button}
                            onClick={() => navigate('/community/question/ask')}>{EN ? "Ask question" : "Задати запитання"}</button>
                </div>
            </div>
        </div>
    );
};

export {Questions};
