import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import css from './ForHeaderProductsBlock.module.css';

const ForHeaderProductsBlock = ({setOpenProducts, openProducts}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    return (
        <div>
            <div className={openProducts ? css.header__link_new_active : css.header__link_new} onClick={() => {
                setOpenProducts(!openProducts)
            }}>
                {EN ? 'Products' : 'Наш продукт'}
            </div>

            {openProducts &&
                <div className={css.link__main}>

                    <Link className={css.link__box} to={'/for-users'}>
                        <div className={css.link__title}>{EN ? 'For users' : 'Користувачам'}</div>
                        <p className={css.link__box_p}>
                            {EN ? 'Here you will find information about various sites,\n' +
                                'YouTube channels, courses that will help you increase your knowledge in IT' :
                                'Тут ви знайдете інформацію про різні сайти,\n' +
                                'YouTube канали, курси, які допоможуть підвищити знання в IT'
                            }
                        </p>
                    </Link>

                    <Link className={css.link__box} to={'/mentors'}>
                        <div className={css.link__title}>{EN ? 'Mentors' : 'Ментори'}</div>
                        <p className={css.link__box_p}>
                            {EN ? 'Here you can choose a mentor based on his level of English, knowledge of technology' +
                                ' and commercial experience.'
                                : 'Тут ви можете вибрати наставника, виходячи з його рівня англійської, знання технологій і' +
                                ' комерційного досвіду.'}
                        </p>
                    </Link>

                    <Link className={css.link__box} to={'/vacancies'}>
                        <div className={css.link__title}>{EN ? 'Recruting' : 'Рекрутинг'}</div>
                        <p className={css.link__box_p}>
                            {EN ? 'Here you can submit a vacancy and respond to an interesting one for you.'
                                :
                                'Тут ви можете залишити вакансію та відповісти на цікаву для вас.'}
                        </p>
                    </Link>

                    <Link className={css.link__box} to={'/rank'}>
                        <div className={css.link__title}>{EN ? 'Rank table' : 'Таблиця рангів'}</div>
                        <p className={css.link__box_p}>
                            {EN ? 'Here you can select the best job candidates.'
                                : 'Тут ви можете обрати найкращих кандидатів на роботу.'}
                        </p>
                    </Link>
                </div>
            }
        </div>
    );
};

export {ForHeaderProductsBlock};
