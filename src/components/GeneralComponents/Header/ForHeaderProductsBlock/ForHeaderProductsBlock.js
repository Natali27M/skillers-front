import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import css from './ForHeaderProductsBlock.module.css';

const ForHeaderProductsBlock = ({valueBurger}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {
        openProducts,
        setOpenProducts,
        setOpenProgramming,
        setOpenResources
    } = valueBurger;

    return (
        <div>
            <div id={'products'} className={openProducts ? css.header__link_new_active : css.header__link_new}
                 onClick={() => {
                     setOpenProducts(!openProducts);
                     setOpenProgramming(false);
                     setOpenResources(false);
                 }}>
                {EN ? 'Products' : 'Наш продукт'}
            </div>

            {openProducts &&
                <div className={css.link__main}>
                    <div className={css.link__box}>
                        <Link className={css.link__box__mini} to={'/for-users'}>
                            <div className={css.link__title_new}>{EN ? 'For users' : 'Користувачам'}</div>
                        </Link>
                        <p className={css.link__box_p}>
                            {EN ? 'Here you will find information about various sites,\n' +
                                'YouTube channels, courses that will help you increase your knowledge in IT' :
                                'Тут ви знайдете інформацію про різні сайти,\n' +
                                'YouTube канали, курси, які допоможуть підвищити знання в IT'}
                        </p>
                    </div>

                    <div className={css.link__box}>
                        <Link className={css.link__box__mini} to={'/mentors'}>
                            <div className={css.link__title_new}>{EN ? 'Mentors' : 'Ментори'}</div>
                        </Link>
                        <p className={css.link__box_p}>
                            {EN ? 'Here you can choose a mentor based on his level of English, knowledge of technology' +
                                ' and commercial experience.'
                                : 'Тут ви можете вибрати наставника, виходячи з його рівня англійської, знання технологій і' +
                                ' комерційного досвіду.'}
                        </p>
                    </div>

                    <div className={css.link__box}>
                        <Link className={css.link__box__mini} to={'/vacancies'}>
                            <div className={css.link__title_new}>{EN ? 'Recruting' : 'Рекрутинг'}</div>
                        </Link>
                        <p className={css.link__box_p}>
                            {EN ? 'Here you can submit a vacancy and respond to an interesting one for you.'
                                :
                                'Тут ви можете залишити вакансію та відповісти на цікаву для вас.'}
                        </p>
                    </div>

                    <div className={css.link__box}>
                        <Link className={css.link__box__mini} to={'/rank'}>
                            <div className={css.link__title_new}>{EN ? 'Rank table' : 'Таблиця рангів'}</div>
                        </Link>
                        <p className={css.link__box_p}>
                            {EN ? 'Here you can see a list of the ranks you get for passing the tests.'
                                : 'Тут ви можете переглянути список рангів, які ви отримуєте за проходження тестів.'}
                        </p>
                    </div>
                </div>
            }
        </div>
    );
};

export {ForHeaderProductsBlock};
