import React from 'react';
import {NavLink} from 'react-router-dom';

import css from './CommunityHeader.module.css';
import home from '../../../images/community/home.svg'
import question from '../../../images/community/question.svg'
import idea from '../../../images/community/idea.svg'

const CommunityHeader = () => {

    return (
        <div className={css.header}>
            <div className={css.header__title}>COMMUNITY</div>
            <div className={css.header__img_box}>
                <NavLink to={'/community/home'}
                         className={({ isActive }) => (isActive ? css.header__img_active
                             : css.header__img_noactive)}>
                    <img src={home} alt="home" className={css.header__img}/>
                </NavLink>

                <NavLink to={'/community/question'}
                         className={({ isActive }) => (isActive ? css.header__img_active
                             : css.header__img_noactive)}>
                    <img src={question} alt="question" className={css.header__img}/>
                </NavLink>

                <NavLink to={'/community/idea'}
                         className={({ isActive }) => (isActive ? css.header__img_active
                             : css.header__img_noactive)}>
                    <img src={idea} alt="idea" className={css.header__img}/>
                </NavLink>
            </div>
        </div>
    );
};

export {CommunityHeader};
