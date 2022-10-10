import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import css from './ForUserPage.module.css';
import resume from '../../images/useful_links/resume.io.png';
import djini from '../../images/useful_links/djini.png';
import dou from '../../images/useful_links/dou.png';
import justjoint from '../../images/useful_links/justjoint.png';
import pm from '../../images/useful_links/pm.png';
import tm from '../../images/useful_links/tm.png';


const ForUserPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    return (
        <div className={css.forUser__page}>
            <div className={css.forUser__wrap}>
                <div className={css.forUser__title}>
                    {EN ? 'For users' : 'Користувачам'}
                </div>
                <div className={css.forUser__subtitle}>
                    {EN ? 'Support the project' : 'Підтримати проект'}
                </div>
                <div className={css.toMain__btn_wrap}>
                    <Link to={'/donation'} className={css.toMain__btn}>
                        {EN ? 'Support' : 'Підтримати'}
                    </Link>
                </div>
                <div className={css.forUser__subtitle}>
                    {EN ? 'Useful links' : 'Корисні посилання'}
                </div>
                <div className={css.links__wrap}>
                    <a href="https://resume.io/" target="_blank" className={css.useful__link}>
                        <img src={resume} alt="resume.io"/>
                        <div>
                            Resume.io
                        </div>
                    </a>
                    <a href="https://djinni.co/" target="_blank" className={css.useful__link}>
                        <img src={djini} alt="djini.co"/>
                        <div>
                            Djini.co
                        </div>
                    </a>
                    <a href="https://dou.ua/" target="_blank" className={css.useful__link}>
                        <img src={dou} alt="dou.ua"/>
                        <div>
                            Dou.ua
                        </div>
                    </a>
                    <a href="https://justjoin.it/" target="_blank" className={css.useful__link}>
                        <img src={justjoint} alt="justjoin.it"/>
                        <div>
                            Justjoin.it
                        </div>
                    </a>
                </div>
                <div className={css.forUser__subtitle}>
                    {EN ? 'Recommended courses ' : 'Рекомендовані курси'}
                </div>
                <div className={css.courses__wrap}>
                    <a href={'https://www.udemy.com/course/software-project-management-max'}
                       className={css.course__block} target="_blank">
                        <img src={pm} alt="pm"/>
                        <div className={css.course__title}>
                            IT Project Management
                        </div>
                        {EN ? <div className={css.course__description}>
                                Gain creative problem-solving skills and easy-to-use tools. This course is designed
                                with a minimum entry threshold, even if you have no previous experience <br/>
                                Temporarily only in Ukrainian
                            </div>
                            :
                            <div className={css.course__description}>
                                Отримайте творчі навички вирішення проблем і прості у використанні інструменти. Цей курс
                                розроблено з мінімальним порогом вступу, навіть якщо у вас немає попереднього досвіду
                            </div>}
                    </a>
                    <a href={'https://www.udemy.com/course/text-mining-max'}
                       className={css.course__block} target="_blank">
                        <img src={tm} alt="tm"/>
                        <div className={css.course__title}>
                            Text Mining. {EN ? 'Fundamentals and applied problems' : 'Основи та прикладні задачі'}
                        </div>
                        {EN ? <div className={css.course__description}>
                                The course of text analysis and text classification, different approaches and variations of
                                methods of working with large masses are considered <br/>
                                Temporarily only in Ukrainian
                            </div>
                            :
                            <div className={css.course__description}>
                                Розглянуто курс аналізу тексту та класифікації тексту, різні підходи та варіації методів
                                роботи з великими масами
                            </div>}
                    </a>
                </div>
                <div className={css.toMain__btn_wrap}>
                    <Link to={'/'} className={css.toMain__btn}>
                        {EN ? 'To main' : 'На головну'}
                    </Link>
                </div>

            </div>
        </div>
    );
};

export {ForUserPage};