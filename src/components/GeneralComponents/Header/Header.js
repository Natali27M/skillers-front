import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Turn as Hamburger} from 'hamburger-react';

import css from './Header.module.css';
import logo from '../../../images/header/SKILLERS.svg';
import userIcon from '../../../images/header/user.svg';
import bell from '../../../images/community/bell.svg';
import save_life_en from '../../../images/header/save-life-en.png';
import save_life_ukr from '../../../images/header/save-life-ukr.png';
import {getNoOpenedNotifications, switchLanguage, updateNotification} from '../../../store';
import useWindowDimensions from '../../../RootFunctions/WindowDimensions';
import useComponentVisible from '../../../RootFunctions/useComponentVisible';
import {ForHeaderProductsBlock} from './ForHeaderProductsBlock/ForHeaderProductsBlock';
import {ForHeaderProgrammingBlock} from './ForHeaderProgrammingBlock/ForHeaderProgrammingBlock';
import {ForHeaderResourcesBlock} from './ForHeaderResourcesBlock/ForHeaderResourcesBlock';
import {ForHeaderBurgerBlock} from './ForHeaderBurgerBlock/ForHeaderBurgerBlock';

const Header = () => {
    const {user} = useSelector(state => state['userReducers']);
    const {EN} = useSelector(state => state['languageReducers']);
    const {noOpenNotifications} = useSelector(state => state['notificationReducers']);

    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {width} = useWindowDimensions();

    const [open, setOpen] = useState(false);
    const [openProducts, setOpenProducts] = useState(false);
    const [openProgramming, setOpenProgramming] = useState(false);
    const [openResources, setOpenResources] = useState(false);
    const [openNotifications, setOpenNotifications] = useState(false);

    const userId = user?.id;

    useEffect(() => {
        if (!isComponentVisible) {
            setOpen(false);
            setOpenProducts(false);
            setOpenProgramming(false);
            setOpenResources(false);
            setIsComponentVisible(true);
        }
    }, [isComponentVisible]);


    useEffect(() => {
        setOpen(false);
    }, [width, pathname]);

    useEffect(() => {
        if (open) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    }, [open]);

    const valueBurger = {
        open,
        openProducts,
        setOpenProducts,
        openProgramming,
        setOpenProgramming,
        openResources,
        setOpenResources
    };

    useEffect(() => {
        if (userId) {
            dispatch(getNoOpenedNotifications({userId}));
        }
    }, [pathname, userId]);

    const commentingPosts = () => {
        if (!openNotifications) {
            setOpenNotifications(true);
            navigate('/community/notification');
            for (const elem of noOpenNotifications) {
                dispatch(updateNotification({data: {isOpened: true}, notificationId: elem.id}));
            }
        } else {
            setOpenNotifications(false);
            navigate('/community/notification');
        }
    };

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
                <div className={css.header__left_group}>
                    <ForHeaderProductsBlock valueBurger={valueBurger}/>
                    <ForHeaderProgrammingBlock valueBurger={valueBurger}/>
                    <ForHeaderResourcesBlock valueBurger={valueBurger}/>
                </div>
                <Link className={css.header__link} to={user ? '/user' : '/login'}>{
                    user ? <div className={css.user__block}><img src={userIcon} alt="user"/> {user.username}
                    </div> : EN ? 'Login' : 'Увійти'}
                </Link>

                <div style={{cursor: 'pointer'}} onClick={() => {
                    commentingPosts();
                }}>
                    <div className={css.notification__main}>
                        {noOpenNotifications.length > 0 &&
                            <div className={css.notification_length}>
                                {noOpenNotifications.length}
                            </div>
                        }
                        <img src={bell} alt="notification" className={css.notification_img}/>
                    </div>
                </div>

                <div className={css.header__switch}>
                    <button onClick={() => dispatch(switchLanguage())}
                            className={EN ? css.switch_btn_en : css.switch_btn_uk}>
                        <div className={EN ? css.switch_btn_ball_en : css.switch_btn_ball_uk}>
                        </div>
                        <div className={EN ? css.switch_btn_name_en : css.switch_btn_name_uk}>
                            {EN ? 'EN' : 'UK'}
                        </div>
                    </button>
                </div>

                <div className={css.burger__btn} onClick={() => setOpen(!open)}>
                    <Hamburger toggled={open}/>
                </div>
            </div>

            <div ref={ref} className={open ? css.burger__menu_open : css.burger__menu_close}>
                <ForHeaderBurgerBlock valueBurger={valueBurger}/>
            </div>
        </div>
    );
};

export {Header};


