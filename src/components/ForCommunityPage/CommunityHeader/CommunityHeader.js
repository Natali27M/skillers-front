import React from 'react';
import {Link} from 'react-router-dom';

import css from './CommunityHeader.module.css';
import logo from '../../../images/community/logo.svg'
import home from '../../../images/community/home.svg'
import question from '../../../images/community/question.svg'
import idea from '../../../images/community/idea.svg'

const CommunityHeader = () => {

    return (
        <div className={css.header}>
            <img src={logo} alt="logo" className={css.header__logo}/>
            <div className={css.header__img_box}>
                <Link to={'/community'}><img src={home} alt="home" className={css.header__img}/></Link>
                <Link to={'/community/question'}><img src={question} alt="question" className={css.header__img}/></Link>
                <Link to={'/community/idea'}><img src={idea} alt="idea" className={css.header__img}/></Link>
            </div>
        </div>
    );
};

export {CommunityHeader};
