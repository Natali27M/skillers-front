import React from 'react';
import {useSelector} from 'react-redux';
import css from './HomePage.module.css';
import {LeaderBord, TechList} from '../../components';
import {Link} from 'react-router-dom';


const HomePage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {user} = useSelector(state => state['userReducers']);

    return (
        <>
            {user ?
                <div className={css.home__page_loginUser}>
                    <div  className={css.block_loginUser}>
                        <div className={css.home__description_loginUser}>
                            {EN ? 'Platform for testing your IT skills' :
                                'Платформа для перевірки твоїх IT навичок'}
                        </div>
                    </div>

                    <TechList/>
                </div>

                :

                <div>
                    <div className={css.home__page}>
                        {/*<img className={css.home__logo} src={logo} alt="logo"/>*/}
                        <h1 className={css.main__title}>
                            SKILLIANT
                        </h1>
                        <div className={css.home__description}>
                            {EN ? 'Platform for testing your IT skills' :
                                'Платформа для перевірки твоїх IT навичок'}
                        </div>
                        <Link to={user ? '/user' : '/registration'} className={css.register__btn}>
                            {user ? (EN ? 'To my profile' : 'На мій профіль') : (EN ? 'Register now' : 'Зареєструватися')}
                        </Link>
                    </div>

                    <TechList/>
                </div>
            }
            <LeaderBord/>
            {/*<Banner/>*/}
        </>
    );
};

export {HomePage};

