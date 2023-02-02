import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import css from '../ForHeaderProductsBlock/ForHeaderProductsBlock.module.css'
import new_icon from '../../../../images/new_icon.svg';

const ForHeaderProgrammingBlock = ({open, setOpenProgramming, openProgramming, setOpenProducts, setOpenResources}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    return (
        <div>
            <div className={openProgramming ? css.header__link_new_active : css.header__link_new} onClick={() => {
                {/*<div className={openProgramming ? !open ? css.header__link_new_active : css.header__link_new_active_open :*/
                }
                {/*open ? css.header__link_new_open_prog : css.header__link_new_prog}*/
                }
                {/*onClick={() => {*/
                }
                if (open) {
                    setOpenProgramming(!openProgramming);
                    setOpenProducts(false);
                    setOpenResources(false);
                } else {
                    setOpenProgramming(!openProgramming)
                }
            }}>
                {EN ? 'Programming' : 'Програмування'}
                {!openProgramming &&
                    <img src={new_icon} alt="new" className={css.new__icon}/>
                }
            </div>

            {
                openProgramming &&
                <div className={css.link__main}>
                    <Link className={css.link__box} to={'/compiler'}>
                        <div className={css.link__title}>{EN ? 'Compiler' : 'Компілятор'}</div>
                        <p className={css.link__box_p}>
                            {EN ? 'Here you can convert (compile) source code written in a particular programming' +
                                ' language to semantically equivalent code in another programming language.'
                                :
                                'Тут ви можете перетворити (компілювати) вихідний код, написаний певною мовою програмування,' +
                                ' у семантично еквівалентний код іншою мовою програмування.'}
                        </p>
                    </Link>

                    <Link className={css.link__box} to={'/createTest'}>
                        <div className={css.link__title}>{EN ? 'Create quiz' : 'Створити тест'}</div>
                        <p className={css.link__box_p}>
                            {EN ? 'Here you can share your knowledge by creating a test that all users can see and take.'
                                :
                                'Тут ви можете поділитися своїми знаннями, створивши тест, який зможуть побачити та пройти' +
                                ' всі користувачі.'}
                        </p>
                    </Link>

                    <div className={css.link__box}>
                        <Link className={css.link__box__mini} to={'/team-coding'}>
                            <div
                                className={css.link__title_new}>{EN ? 'Collaborative programming' : 'Спільне програмування'}</div>
                            <img src={new_icon} alt="new" className={css.new__icon}/>
                        </Link>
                        <p className={css.link__box_p}>
                            {EN ? 'Here you can write code in real time in a team while being far from each other.'
                                :
                                'Тут ви можете писати код в реальному часі в команді, перебуваючи далеко один від одного.'}
                        </p>
                    </div>
                </div>
            }
        </div>
    )
        ;
};

export {ForHeaderProgrammingBlock};
