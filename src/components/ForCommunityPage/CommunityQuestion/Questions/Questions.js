import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import css from './Questions.module.css';

import {getAllQuestions} from "../../../../store";
import {PaginationSmall} from "../../../GeneralComponents";
import {Question} from "../Question/Question";

const Questions = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    let {user} = useSelector(state => state['userReducers']);
    const {questions} = useSelector(state => state['questionsReducers']);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!user) {
            return navigate('/login');
        }

        dispatch(getAllQuestions(page))
    }, [page, dispatch]);


    return (
        <div className={css.container}>
            <div className={css.questions__container}>
                <div className={css.top_ack__block}>
                    <h3>{EN ? "All question" : "Всі запитання"}</h3>
                    <button className={css.ask__button}
                            onClick={() => navigate('/community/question/ask')}>{EN ? "Ask question" : "Задати запитання"}</button>
                </div>

                <div>
                    <div className={css.questions__block}>
                        {questions?.data?.map(value => <Question key={value.id} question={value}/>)}
                    </div>
                    <div>
                        <PaginationSmall pageNumber={page}
                                         setPageNumber={setPage}
                                         pageCount={questions?.meta?.pagination?.pageCount}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export {Questions};
