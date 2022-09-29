import React, {useEffect, useState} from 'react';
import css from './Header.module.css';
import logo from '../../../images/header/SKILLERS.svg';
import userIcon from '../../../images/header/user.svg';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {switchLanguage} from '../../../store';
import { Turn as Hamburger } from 'hamburger-react'
import useWindowDimensions from '../../../RootFunctions/WindowDimensions';


const Header = () => {
    const {user, jwt} = useSelector(state => state['userReducers']);
    const {EN} = useSelector(state => state['languageReducers']);
    const dispatch = useDispatch();

    const {pathname} = useLocation()

    const {width} = useWindowDimensions();


    const [open, setOpen] = useState(false);




    useEffect(() => {
        setOpen(false);
    }, [width, pathname])


    return (
        <div className={css.main__header}>
            <Link to={'/'}>
                <img className={css.header__logo} src={logo} alt="logo"/>
            </Link>

            <div className={css.header__left}>
                <div>
                    <button onClick={() => dispatch(switchLanguage())}
                            className={EN ? css.switch_btn_en : css.switch_btn_uk}>
                        <div className={EN ? css.switch_btn_ball_en : css.switch_btn_ball_uk}>
                        </div>
                        <div
                            className={EN ? css.switch_btn_name_en : css.switch_btn_name_uk}>
                            {EN ? 'EN' : 'UK'}
                        </div>
                    </button>
                </div>
                <Link className={css.header__link} to={user ? '/user' : '/login'}>{
                    user ? <div className={css.user__block}><img src={userIcon} alt="user"/> {user.username}
                    </div> : <div className={css.login__btn}>{EN ? 'Login' : 'Увійти'}</div> }
                </Link>
            </div>
            <div className={css.burger__btn}  onClick={() => setOpen(!open)}>
                <Hamburger toggled={open}/>
            </div>

            <div className={open ? css.burger__menu_open : css.burger__menu_close}>
                <div>
                    <button onClick={() => dispatch(switchLanguage())}
                            className={EN ? css.switch_btn_en : css.switch_btn_uk}>
                        <div className={EN ? css.switch_btn_ball_en : css.switch_btn_ball_uk}>
                        </div>
                        <div
                            className={EN ? css.switch_btn_name_en : css.switch_btn_name_uk}>
                            {EN ? 'EN' : 'UK'}
                        </div>
                    </button>
                </div>
                <Link className={css.header__link} to={user ? '/user' : '/login'}>{
                    user ? <div className={css.user__block}><img src={userIcon} alt="user"/> {user.username}
                    </div> : (EN ? 'Login' : 'Увійти')}
                </Link>

            </div>
        </div>
    );
};

export {Header};