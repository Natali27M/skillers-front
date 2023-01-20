import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import css_helper from "../Questions/Questions.module.css";
import css from './QuestionDetails.module.css';
import {getOneQuestion} from "../../../../store";

const QuestionDetails = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {oneQuestion} = useSelector(state => state['questionsReducers']);


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();


    useEffect(() => {
        dispatch(getOneQuestion(Number(id)));
        console.log(oneQuestion);
    }, [id])

    return (
        <div className={css_helper.container}>
            <div className={css_helper.questions__container}>
                <div className={css.question_details_block}>
                    <div className={css.title__block}>
                        <div className={css.question_title}>
                           {oneQuestion.attributes.title}
                        </div>
                        <div>
                            <button className={css_helper.ask__button}
                                    onClick={() => navigate('/community/question/ask')}>{EN ? "Ask question" : "Задати запитання"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {QuestionDetails};
