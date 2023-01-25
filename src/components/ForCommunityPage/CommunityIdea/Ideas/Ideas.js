import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import css_helper from '../../CommunityQuestion/Questions/Questions.module.css';
import css from './Ideas.module.css';
import {useNavigate} from "react-router-dom";

const Ideas = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user} = useSelector(state => state['userReducers']);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [filters, setFilters] = useState(false);


    useEffect(() => {
        if (!user) {
            return navigate('/login');
        }
        // dispatch()
    }, [])

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
            </div>
        </div>
    );
};

export {Ideas};
