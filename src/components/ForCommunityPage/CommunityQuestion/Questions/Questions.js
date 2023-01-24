import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import css from './Questions.module.css';

import {getAllQuestions, getTechnologies} from "../../../../store";
import {PaginationSmall} from "../../../GeneralComponents";
import {Question} from "../Question/Question";
import {Checkbox, FormControlLabel} from "@mui/material";
import qs from "qs";

const Questions = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    let {user} = useSelector(state => state['userReducers']);
    const {questions, isDeleteQuestion} = useSelector(state => state['questionsReducers']);
    const {technologies} = useSelector(state => state['technologiesReducers']);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState(false);
    const [technologyArray, setTechnologyArray] = useState([]);


    useEffect(() => {
        if (!user) {
            return navigate('/login');
        }
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

    return (
        <div className={css.container}>
            <div className={css.questions__container}>
                <div className={css.top_ack__block}>
                    <h3>{EN ? "All Question" : "Всі Запитання"}</h3>
                    <button className={css.ask__button}
                            onClick={() => navigate('/community/question/ask')}>{EN ? "Ask question" : "Задати запитання"}</button>
                </div>

                <div className={css.filters__block}>
                    <div className={css.nav}>
                        <div>
                            <span>{questions?.data?.length}</span>
                            <span>{EN ? "Questions" : "Запитань"}</span>
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
