import React from 'react';
import css from './TechList.module.css'
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import java from '../../../images/techList/java.svg'
import python from '../../../images/techList/python.svg'
import nodejs from '../../../images/techList/nodejs.svg'
import csharp from '../../../images/techList/csharp.svg'
import cplusplus from '../../../images/techList/cplusplus.svg'
import html5 from '../../../images/techList/html5.svg'


const TechList = () => {
    const {EN} = useSelector(state => state['languageReducers']);


    return (
        <div className={css.tech__wrap}>
            <h4 className={css.tech__title}>
                {EN ? "Choose technology" : "Виберіть технологію"}
            </h4>
            <div className={css.tech__list}>
                <Link className={css.tech__block} to={'/test-list/3'}>
                    <img className={css.tech__img} src={java} alt="java"/>
                </Link>
                <Link className={css.tech__block} to={'/test-list/4'}>
                    <img className={css.tech__img} src={python} alt="python"/>
                </Link>
                <Link className={css.tech__block} to={'/test-list/5'}>
                    <img className={css.tech__img} src={nodejs} alt="nodejs"/>
                </Link>
                <Link className={css.tech__block} to={'/test-list/6'}>
                    <img className={css.tech__img} src={csharp} alt="csharp"/>
                </Link>
                <Link className={css.tech__block} to={'/test-list/7'}>
                    <img className={css.tech__img} src={cplusplus} alt="cplusplus"/>
                </Link>
                <Link className={css.tech__block} to={'/test-list/8'}>
                    <img className={css.tech__img} src={html5} alt="html5"/>
                </Link>
            </div>
        </div>
    );
};

export {TechList};