import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import css from '../ForHeaderProductsBlock/ForHeaderProductsBlock.module.css'
import new_icon from '../../../../images/new_icon.svg';

const ForHeaderProgrammingBlock = ({valueBurger}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {
        setOpenProducts,
        openProgramming,
        setOpenProgramming,
        setOpenResources
    } = valueBurger;

    return (
        <div>
            <div className={openProgramming ? css.header__link_new_active : css.header__link_new} onClick={() => {
                setOpenProgramming(!openProgramming);
                setOpenProducts(false);
                setOpenResources(false);
            }}>
                {EN ? 'Programming' : 'Програмування'}
                {!openProgramming &&
                    <img src={new_icon} alt="new" className={css.new__icon}/>
                }
            </div>

            {
                openProgramming &&
                <div className={css.link__main}>
                    <div className={css.link__box}>
                        <Link className={css.link__box__mini} to={'/compiler'}>
                            <div className={css.link__title_new}>{EN ? 'Compiler' : 'Компілятор'}</div>
                        </Link>
                        <p className={css.link__box_p}>
                            {EN ? 'Here you can convert (compile) source code written in a particular programming' +
                                ' language to semantically equivalent code in another programming language.'
                                :
                                'Тут ви можете перетворити (компілювати) вихідний код, написаний певною мовою ' +
                                'програмування, у семантично еквівалентний код іншою мовою програмування.'}
                        </p>
                    </div>

                    <div className={css.link__box}>
                        <Link className={css.link__box__mini} to={'/createTest'}>
                            <div className={css.link__title_new}>{EN ? 'Create quiz' : 'Створити тест'}</div>
                        </Link>
                        <p className={css.link__box_p}>
                            {EN ? 'Here you can share your knowledge by creating a test that all users can see and take.'
                                :
                                'Тут ви можете поділитися своїми знаннями, створивши тест, який зможуть побачити та ' +
                                'пройти всі користувачі.'}
                        </p>
                    </div>

                    <div className={css.link__box}>
                        <Link className={css.link__box__mini} to={'/team-coding'}>
                            <div className={css.link__title_new}>
                                {EN ? 'Collaborative programming' : 'Спільне програмування'}
                            </div>
                            <img src={new_icon} alt="new" className={css.new__icon_middle}/>
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
