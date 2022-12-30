import React, {useEffect, useState} from 'react';

import rootCSS from '../../styles/root.module.css'
import css from './AdminPage.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {deleteFeedback, getFeedback, updateIsApproved} from '../../store';
import {Link, Navigate} from 'react-router-dom';
import {getTestsForApprove} from '../../store/slices/testPage.slice';
import cross from '../../images/cross-red.svg';
import arrow from '../../images/arrow.svg';
import {UnapprovedMentors, UnApprovedRecruiters} from "../../components";

const AdminPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {roles} = useSelector(state => state['userReducers']);

    const {testsForApprove} = useSelector(state => state['testsReducers']);

    const {feedbackPage, isDelete, isConfirmed} = useSelector(state => state['feedbackReducers']);

    const dispatch = useDispatch();

    const [testsPageNumber, setTestsPageNumber] = useState(1);
    const [feedbackPageNumber, setFeedbackPageNumber] = useState(1);

    useEffect(() => {
        dispatch(getTestsForApprove(testsPageNumber));
    }, [testsPageNumber]);

    useEffect(() => {
        dispatch(getFeedback(feedbackPageNumber));
    }, [feedbackPageNumber, isDelete, isConfirmed]);


    const makeDeleteFeedback = (id) => {
        dispatch(deleteFeedback(id))
    };

    const approve = (id, booleanValue) => {
        dispatch(updateIsApproved({id, booleanValue}))
    }

    if (!(roles?.includes('admin'))) {
        return <Navigate to={'/user'} replace/>;
    }

    return (
        <div className={css.admin__page}>
            <div className={rootCSS.root__background}></div>
            <div className={css.admin__wrap}>
                {/*<Wallet/>*/}
                <div className={css.admin__title}>
                    {EN ? 'Tests for approve' : 'Тести для затвердження'}
                </div>
                <div className={css.tests__wrap}>
                    <div className={css.tests__header}>
                        <div className={css.test__name}>
                            {EN ? 'Name' : 'Назва'}
                        </div>
                        <div className={css.test__difficult}>
                            {EN ? 'Difficult' : 'Складність'}
                        </div>
                        <div className={css.test__difficult}>
                            {EN ? 'Tech id' : 'ІД технології'}
                        </div>
                        <div className={css.test__difficult}>
                            {EN ? 'User id' : 'ІД користувача'}
                        </div>
                    </div>
                    {testsForApprove?.data?.map(test =>
                        <Link to={`/test/${test.id}`} className={css.tests__block} key={test.id}>
                            <div className={css.test__name}>
                                {test?.attributes?.name}
                            </div>
                            <div className={css.test__difficult}>
                                {test?.attributes?.difficult}
                            </div>
                            <div className={css.test__difficult}>
                                {test?.attributes?.techId}
                            </div>
                            <div className={css.test__difficult}>
                                {test?.attributes?.authorId}
                            </div>
                        </Link>
                    )}
                    {testsForApprove?.data?.length === 0 &&
                        <div>{EN ? 'no tests for approve' : 'немає тестів для підтвердження'}</div>
                    }
                    <div className={css.pagination__wrap}>
                        <div className={css.pagination__block}>
                            <img src={arrow} alt="arrow" className={css.arrow__left}
                                 onClick={() => testsPageNumber > 1 && setTestsPageNumber(testsPageNumber - 1)}/>
                            <div>{testsPageNumber} / {testsForApprove?.meta?.pagination?.pageCount}</div>
                            <img src={arrow} alt="arrow" className={css.arrow__right}
                                 onClick={() => testsPageNumber < testsForApprove.meta?.pagination?.pageCount && setTestsPageNumber(testsPageNumber + 1)}/>
                        </div>
                    </div>
                </div>
                <div className={css.admin__title}>
                    {EN ? 'Feedback' : 'Відгуки'}
                </div>
                <div className={css.feedback__wrap}>
                    <div className={css.feedback__header}>
                        <div className={css.feedback__header_message}>
                            {EN ? 'Message' : 'Повідомлення'}
                        </div>
                        <div className={css.feedback__name}>
                            {EN ? 'Name' : 'Ім\'я'}
                        </div>
                        <div className={css.feedback__name}>
                            Email
                        </div>
                    </div>
                    {feedbackPage?.data && feedbackPage?.data?.map(feedback =>
                        <div key={feedback.id} className={css.feedback__block}>
                            <div className={css.feedback__message}>
                                {feedback?.attributes.message}
                            </div>
                            <div className={css.feedback__name}>
                                {feedback?.attributes.userName}
                            </div>
                            <div className={css.feedback__email}>
                                {feedback?.attributes.email}
                            </div>
                            <div className={css.delete__feedback} onClick={() => makeDeleteFeedback(feedback?.id)}>
                                <img src={cross} alt="cross"/>
                            </div>
                            <div className={css.approve__feedback}>
                                {
                                    feedback?.attributes.isApproved ?
                                        <div className={css.feedbackGrey} onClick={() => approve(feedback?.id, false)}>
                                            <div className={css.feedback__hover}>
                                                {EN ?
                                                    <span>cancel <br/> confirmation</span> :
                                                    <span>відмінити <br/> підтвердження</span>}
                                            </div>
                                        </div> :
                                        <div className={css.feedbackDone} onClick={() => approve(feedback?.id, true)}>
                                            <div className={css.feedback__hover}>
                                                {EN ? "approve" : "підтвердити"}
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    )}

                    <div className={css.pagination__wrap}>
                        <div className={css.pagination__block}>
                            <img src={arrow} alt="arrow" className={css.arrow__left}
                                 onClick={() => feedbackPageNumber > 1 && setFeedbackPageNumber(feedbackPageNumber - 1)}/>
                            <div>{feedbackPageNumber} / {feedbackPage?.meta?.pagination?.pageCount}</div>
                            <img src={arrow} alt="arrow" className={css.arrow__right}
                                 onClick={() => feedbackPageNumber < feedbackPage.meta?.pagination?.pageCount && setFeedbackPageNumber(feedbackPageNumber + 1)}/>
                        </div>
                    </div>
                </div>
                <div className={css.mentors__wrap}>
                    <UnapprovedMentors/>
                </div>
                <div className={css.mentors__wrap}>
                    <UnApprovedRecruiters/>
                </div>
            </div>
        </div>
    );
};

export {AdminPage};
