import React, {useEffect, useState} from 'react';
import css from './Header.module.css';
import logo from '../../../images/header/SKILLERS.svg';
import userIcon from '../../../images/header/user.svg';
import new_icon from '../../../images/new_icon.svg';
import save_life_en from '../../../images/header/save-life-en.png';
import save_life_ukr from '../../../images/header/save-life-ukr.png';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {switchLanguage} from '../../../store';
import {Turn as Hamburger} from 'hamburger-react';
import useWindowDimensions from '../../../RootFunctions/WindowDimensions';
import useComponentVisible from '../../../RootFunctions/useComponentVisible';


const Header = () => {
    const {user} = useSelector(state => state['userReducers']);
    const {EN} = useSelector(state => state['languageReducers']);

    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(true);

    const dispatch = useDispatch();

    const {pathname} = useLocation();

    const {width} = useWindowDimensions();


    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (!isComponentVisible) {
            setOpen(false);
            setIsComponentVisible(true);
        }
    }, [isComponentVisible]);

    useEffect(() => {
        setOpen(false);
    }, [width, pathname]);


    return (
        <div className={css.main__header}>
            <div className={css.header__right}>
                <Link to={'/'}>
                    <img className={css.header__logo} src={logo} alt="logo"/>
                </Link>
                <a className={css.save__life_link} href="https://savelife.in.ua/" target="_blank">
                    <img className={css.save__life_link} src={EN ? save_life_en : save_life_ukr} alt="save_life"/>
                </a>
            </div>


            <div className={css.header__left}>


                <Link className={css.header__link} to={'/for-users'}>
                    {EN ? 'For users' : 'Користувачам'}
                </Link>
                <Link className={css.header__link} to={'/compiler'}>
                    {EN ? 'Compiler' : 'Компілятор'}
                </Link>
                <Link className={css.header__link} to={'/createTest'}>
                    {EN ? 'Create quiz' : 'Створити тест'}
                </Link>
                <Link className={css.header__link} to={'/mentors'}>
                    {EN ? 'Mentors' : 'Ментори'}
                </Link>
                <Link className={css.header__link} to={'/team-coding'}>
                    <div>{EN ? 'Collaborative programming' : 'Спільне програмування'}</div>
                </Link>
                <Link className={css.header__link} to={user ? '/user' : '/login'}>{
                    user ? <div className={css.user__block}><img src={userIcon} alt="user"/> {user.username}
                    </div> : EN ? 'Login' : 'Увійти'}
                </Link>
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
            </div>
            <div className={css.burger__btn} onClick={() => setOpen(!open)}>
                <Hamburger toggled={open}/>
            </div>

            <div ref={ref} className={open ? css.burger__menu_open : css.burger__menu_close}>
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
                <Link className={css.header__link} to={'/for-users'}>
                    {EN ? 'For users' : 'Користувачам'}
                </Link>
                <Link className={css.header__link} to={'/compiler'}>
                    {EN ? 'Compiler' : 'Компілятор'}
                </Link>
                <Link className={css.header__link} to={'/createTest'}>
                    {EN ? 'Create quiz' : 'Створити тест'}
                </Link>
                <Link className={css.header__link} to={'/mentors'}>
                    {EN ? 'Mentors' : 'Ментори'}
                </Link>
                <Link className={css.header__link} to={'/team-coding'}>
                    <div>{EN ? 'Collaborative programming' : 'Спільне програмування'}</div>
                </Link>
                <Link className={css.header__link} to={user ? '/user' : '/login'}>{
                    user ? <div className={css.user__block}><img src={userIcon} alt="user"/> {user.username}
                    </div> : (EN ? 'Login' : 'Увійти')}
                </Link>

            </div>
        </div>
    );
};

export {Header};
