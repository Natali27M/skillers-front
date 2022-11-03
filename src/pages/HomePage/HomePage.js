import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import css from './HomePage.module.css';
import css_admin from '../AdminPage/AdminPage.module.css'
import {LeaderBord, TechList} from '../../components';
import {Link} from 'react-router-dom';
import arrow from "../../images/arrow.svg";
import {getFeedback} from "../../store";


const HomePage = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user} = useSelector(state => state['userReducers']);
    const dispatch = useDispatch();

    const {feedbackPage, isDelete, isConfirmed} = useSelector(state => state['feedbackReducers']);

    const [feedbackPageNumber, setFeedbackPageNumber] = useState(1);

    useEffect(() => {
        dispatch(getFeedback(feedbackPageNumber));
    }, [feedbackPageNumber, isDelete, isConfirmed]);

    return (
        <>
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
            <LeaderBord/>

            <div className={css.rating__bord_wrap}>
                <div className={css.rating__wrap}>
                    <div className={css_admin.admin__title}>
                        {EN ? 'Feedback' : 'Відгуки'}
                    </div>
                    <div className={css_admin.feedback__wrap}>
                        <div className={css_admin.feedback__header}>
                            <div className={css_admin.feedback__header_message}>
                                {EN ? 'Message' : 'Повідомлення'}
                            </div>
                            <div className={css_admin.feedback__name}>
                                {EN ? 'Name' : 'Ім\'я'}
                            </div>
                            <div className={css_admin.feedback__name}>
                                Email
                            </div>
                        </div>
                        {feedbackPage?.data && feedbackPage?.data?.filter(value=> value.attributes.isApproved).map(feedback =>
                            <div key={feedback.id} className={css_admin.feedback__block}>
                                <div className={css_admin.feedback__message}>
                                    {feedback?.attributes.message}
                                </div>
                                <div className={css_admin.feedback__name}>
                                    {feedback?.attributes.userName}
                                </div>
                                <div className={css_admin.feedback__name}>
                                    {feedback?.attributes.email}
                                </div>
                            </div>
                        )}
                        <div className={css_admin.pagination__wrap}>
                            <div className={css_admin.pagination__block}>
                                <img src={arrow} alt="arrow" className={css_admin.arrow__left}
                                     onClick={() => feedbackPageNumber > 1 && setFeedbackPageNumber(feedbackPageNumber - 1)}/>
                                <div>{feedbackPageNumber} / {feedbackPage?.meta?.pagination?.pageCount}</div>
                                <img src={arrow} alt="arrow" className={css_admin.arrow__right}
                                     onClick={() => feedbackPageNumber < feedbackPage.meta?.pagination?.pageCount && setFeedbackPageNumber(feedbackPageNumber + 1)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<Banner/>*/}
        </>
    );
};

export {HomePage};
