import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import qs from "qs";
import {Checkbox, FormControlLabel} from "@mui/material";

import css_helper from '../../CommunityQuestion/Questions/Questions.module.css';
import css from './Ideas.module.css';

import {getAllCategories, getAllIdeas, getTechnologies} from "../../../../store";
import {PaginationSmall} from "../../../GeneralComponents";
import {OneIdea} from "../OneIdea/OneIdea";

const Ideas = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user} = useSelector(state => state['userReducers']);
    const {ideas} = useSelector(state => state['ideasReducers']);
    const {technologies} = useSelector(state => state['technologiesReducers']);
    const {categories} = useSelector(state => state['categoriesReducers']);


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
                }, categories: {
                    value: {
                        $in: categoryArray,
                    },
                }
            }
        }, {encodeValuesOnly: true});

        dispatch(getAllIdeas({page, query}))
        dispatch(getTechnologies());
        dispatch(getAllCategories());

    }, [page, dispatch, technologyArray.length, categoryArray.length])


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
    const setCategory = (event) => {
        if (event.target.checked) {
            return setCategoryArray([...categoryArray, event.target.value]);
        }

        const index = categoryArray.findIndex(value => value === event.target.value);
        if (index >= 0) {
            let arr = [...categoryArray]
            const newArray = arr.filter(value => value !== event.target.value);
            return setCategoryArray(newArray);
        }
    }

    return (
        <div className={css_helper.container}>
            <div className={css_helper.questions__container}>
                <div className={css_helper.top_ack__block}>
                    <h4>{EN ? "All Ideas" : "Всі Ідеї"}</h4>
                    <h3>Community ideas</h3>
                    <button className={css_helper.ask__button}
                            onClick={() => navigate('/community/idea/post')}>{EN ? "Share idea" : "Поширити ідею"}</button>
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
                            <span>{ideas?.data?.length}</span>
                            <span>{EN ? "Ideas" : "Ідей"}</span>
                        </div>
                        <button onClick={() => setFilters(!filters)}>
                            {EN ? "Filter" : " Фільтрувати"}
                        </button>
                    </div>
                </div>


                {filters && <div className={css.ideas_filter_by}>
                    <div className={css.filters}>
                    <span>
                        {EN ? "Filter by technologies:" : "Фільтрація за технологіями:"}
                    </span>
                        <div>
                            {technologies?.data?.map(technology => <FormControlLabel
                                onChange={setTechnology}
                                style={{margin: "2px"}}
                                key={technology.id}
                                control={<Checkbox
                                    value={technology.attributes.value}
                                    size={"small"}/>}
                                label={<div
                                    className={css.label}>{technology?.attributes?.value}</div>}/>)}
                        </div>

                        <span>
                        {EN ? "Filter by categories:" : "Фільтрація за категоріями:"}
                    </span>
                        <div>
                            {categories?.data?.map(category => <FormControlLabel
                                onChange={setCategory}
                                style={{margin: "2px"}}
                                key={category.id}
                                control={<Checkbox
                                    value={category.attributes.value}
                                    size={"small"}/>}
                                label={<div
                                    className={css.label}>{category?.attributes?.value}</div>}/>)}
                        </div>
                    </div>
                </div>
                }


                <div className={css.filter_container}>
                    <div className={css.ideas}>
                        {ideas?.data?.length > 0 ? ideas.data.map(value => <OneIdea key={value.id} idea={value}/>) :
                            <h3>{EN ? "No any ideas" : "Немає ідей"}</h3>}
                    </div>

                    <div className={css.ideas_pagination}>
                        <PaginationSmall pageNumber={page}
                                         setPageNumber={setPage}
                                         pageCount={ideas?.meta?.pagination?.pageCount}/>
                    </div>
                </div>
            </div>
        </div>);
};

export {Ideas};
