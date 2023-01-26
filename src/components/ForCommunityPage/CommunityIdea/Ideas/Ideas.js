import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import qs from "qs";

import css_helper from '../../CommunityQuestion/Questions/Questions.module.css';
import css from './Ideas.module.css';

import {getAllIdeas} from "../../../../store";
import {PaginationSmall} from "../../../GeneralComponents";
import {OneIdea} from "../OneIdea/OneIdea";

const Ideas = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user} = useSelector(state => state['userReducers']);
    const {ideas} = useSelector(state => state['ideasReducers']);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState(false);
    const [technologyArray, setTechnologyArray] = useState([]);
    const [categoryArray, setCategoryArray] = useState([]);

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
                categories: {
                    value: {
                        $in: categoryArray,
                    },
                }
            }
        }, {encodeValuesOnly: true});

        dispatch(getAllIdeas({page, query}))

    }, [page])

    return (
        <div className={css_helper.container}>
            <div className={css_helper.questions__container}>
                <div className={css_helper.top_ack__block}>
                    <h4>{EN ? "All Ideas" : "Всі Ідеї"}</h4>
                    <h3>Community ideas</h3>
                    <button className={css_helper.ask__button}
                            onClick={() => navigate('/community/idea/post')}>{EN ? "Share idea" : "Поширити ідеї"}</button>
                </div>
                <div className={css.header_container}>
                    <div className={css.ideas_header}>
                        {EN ? "Is a place where you can read, discuss or share some kind of ideas in different categories" :
                            "Це місце, де ви можете читати, обговорювати або поширювати певного роду ідеї  за різними категорями"}
                    </div>
                </div>

                <div className={css.filter_container}>
                    <div className={css_helper.nav}>
                        <div>
                            {/*<span>{questions?.data?.length}</span>*/}
                            <span>{EN ? "Ideas" : "Ідей"}</span>
                        </div>
                        <button onClick={() => setFilters(!filters)}>
                            {EN ? "Filter" : " Фільтрувати"}
                        </button>
                    </div>
                </div>

                <div className={css.filter_container}>
                    <div className={css.ideas}>
                        {ideas?.data?.length && ideas.data.map(value => <OneIdea key={value.id} idea={value}/>)}
                    </div>

                    <div className={css.ideas_pagination}>
                        <PaginationSmall pageNumber={page}
                                         setPageNumber={setPage}
                                         pageCount={ideas?.meta?.pagination?.pageCount}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {Ideas};
