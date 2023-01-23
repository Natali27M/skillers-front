import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Turn as Hamburger} from 'hamburger-react';

import css from './Header.module.css';
import logo from '../../../images/header/SKILLERS.svg';
import userIcon from '../../../images/header/user.svg';
import new_icon from '../../../images/new_icon.svg';
import save_life_en from '../../../images/header/save-life-en.png';
import save_life_ukr from '../../../images/header/save-life-ukr.png';
import {makeNotification, switchLanguage} from '../../../store';
import useWindowDimensions from '../../../RootFunctions/WindowDimensions';
import useComponentVisible from '../../../RootFunctions/useComponentVisible';
import {Notification} from '../../ForCommunityPage';


const Header = () => {
    const {user} = useSelector(state => state['userReducers']);
    const {EN} = useSelector(state => state['languageReducers']);
    const {posts, notifications} = useSelector(state => state['postReducers']);

    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(true);
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const {width} = useWindowDimensions();
    const [open, setOpen] = useState(false);
    const [openNotifications, setOpenNotifications] = useState(false);

    useEffect(() => {
        if (!isComponentVisible) {
            setOpen(false);
            setIsComponentVisible(true);
        }
    }, [isComponentVisible]);

    useEffect(() => {
        setOpen(false);
    }, [width, pathname]);

    useEffect(() => {
        const fullNotifications = [];
        if (posts.data) {
            for (const post of posts.data) {
                if (user.id === post.attributes.userId) {
                    for (const notificationElement of post.attributes.comments.data) {
                        if (notificationElement.attributes.notification === false) {
                            const elementNotification = {
                                notifications: notificationElement,
                                postId: post.id
                            }
                            fullNotifications.push(elementNotification);
                        }
                    }
                }
            }
        }

        dispatch(makeNotification(fullNotifications));
    }, [posts]);

    const commentingPosts = () => {
        if(!openNotifications) {
            setOpenNotifications(true);
        } else {
            setOpenNotifications(false);
        }
    }

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

                <div className={css.link__wrap}>
                    <Link className={css.header__link} to={'/team-coding'}>
                        <div>{EN ? 'Collaborative programming' : 'Спільне програмування'}</div>
                    </Link>
                    <img src={new_icon} alt="new" className={css.new__icon}/>
                </div>

                <div onClick={() => {
                    commentingPosts()
                }}>{notifications.length}</div>

                {openNotifications && <div className={css.notification__main}>
                    {notifications.map(value => <Notification key={value.notifications.id} notification={value}/>)}
                </div>
                }

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
                <div className={css.link__wrap}>
                    <Link className={css.header__link} to={'/team-coding'}>
                        <div>{EN ? 'Collaborative programming' : 'Спільне програмування'}</div>
                    </Link>
                    <img src={new_icon} alt="new" className={css.new__icon}/>
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
