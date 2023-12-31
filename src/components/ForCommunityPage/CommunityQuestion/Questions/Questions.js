import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {Checkbox, FormControlLabel} from "@mui/material";
import qs from "qs";
import {Helmet} from "react-helmet-async";

import css from './Questions.module.css';

import {getAllQuestions, getTechnologies} from "../../../../store";
import {PaginationSmall} from "../../../GeneralComponents";
import {Question} from "../Question/Question";


const Questions = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user} = useSelector(state => state['userReducers']);
    const {questions, isDeleteQuestion} = useSelector(state => state['questionsReducers']);
    const {technologies} = useSelector(state => state['technologiesReducers']);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState(false);
    const [technologyArray, setTechnologyArray] = useState([]);


    useEffect(() => {
        let query = qs.stringify({
            filters: {
                technologies: {
                    value: {
                        $in: technologyArray,
                    },
                },
            }
        }, {encodeValuesOnly: true});
        dispatch(getAllQuestions({page, query}));

        dispatch(getTechnologies());
    }, [page, dispatch, isDeleteQuestion, technologyArray.length]);


    const setTechnology = (event) => {
        if (event.target.checked) {
            return setTechnologyArray([...technologyArray, event.target.value]);
        }

        const index = technologyArray.findIndex(value => value === event.target.value);
        if (index >= 0) {
            let arr = [...technologyArray]
            const newArray = arr.filter(value => value !== event.target.value);
            return setTechnologyArray(newArray);
        }
    }

    if (!user) {
        return <Navigate to={'/login'} replace/>
    }

    const title = 'Read questions';
    const description = 'Have a list of questions and read them';
    const url = `https://skilliant.net/question`;

    return (
        <div className={css.container}>
            <Helmet>
                <meta charSet="utf-8"/>
                <meta name="description" content={description}/>
                <meta property="og:url" content={url}/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="skilliant.net"/>
                <title>{title}</title>
                <link rel="canonical" href={url}/>
            </Helmet>

            <div className={css.questions__container}>
                <div className={css.top_ack__block}>
                    <h4>{EN ? "All Question" : "Всі Запитання"}</h4>
                    <h3>Community questions</h3>
                    <button className={css.ask__button}
                            onClick={() => navigate('/community/question/ask')}>{EN ? "Ask question" : "Задати запитання"}</button>
                </div>

                <div className={css.filters__block}>
                    <div className={css.nav}>
                        <div>
                            <span>{EN ? "Number of questions: " : "Кількість запитань: "}</span>
                            <span>{questions?.data?.length}</span>
                        </div>
                        <button onClick={() => setFilters(!filters)}>
                            {EN ? "Filter" : " Фільтрувати"}
                        </button>
                    </div>

                </div>

                {
                    filters &&
                    <div className={css.filters__block}>
                        <div className={css.filters}>
                            <span>
                            {EN ? "Filter by technologies:" : "Фільтрація за технологіями:"}
                            </span>
                            <div>
                                {technologies?.data?.map(technology =>
                                    <FormControlLabel onChange={setTechnology}
                                                      style={{margin: "2px"}}
                                                      key={technology.id}
                                                      control={<Checkbox value={technology.attributes.value}
                                                                         size={"small"}/>}
                                                      label={<div
                                                          className={css.label}>{technology?.attributes?.value}</div>}/>)
                                }
                            </div>
                        </div>
                    </div>
                }

                <div>
                    <div className={css.questions__block}>
                        {questions?.data?.map(value => <Question key={value.id} question={value}/>)}
                        <div>
                            <PaginationSmall pageNumber={page}
                                             setPageNumber={setPage}
                                             pageCount={questions?.meta?.pagination?.pageCount}
                            />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export {Questions};
