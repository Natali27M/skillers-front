import React, {useEffect, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import rootCSS from '../../styles/root.module.css';
import css from './AdminPage.module.css';
import {deleteFeedback, getCodeTestsForApprove, getFeedback, updateIsApproved} from '../../store';
import {getTestsForApprove} from '../../store/slices/testPage.slice';
import cross from '../../images/cross-red.svg';
import {PaginationSmall, PaymentRequests, UnapprovedMentors, UnApprovedRecruiters} from "../../components";

const AdminPage = () => {

    const {EN} = useSelector(state => state['languageReducers']);

    const {roles} = useSelector(state => state['userReducers']);

    const {testsForApprove} = useSelector(state => state['testsReducers']);

    const {codeTestPageForApprove} = useSelector(state => state['codeTestReducers']);

    const {feedbackPage, isDelete, isConfirmed} = useSelector(state => state['feedbackReducers']);

    const dispatch = useDispatch();

    const [testsPageNumber, setTestsPageNumber] = useState(1);
    const [codeTestsPageNumber, setCodeTestsPageNumber] = useState(1);
    const [feedbackPageNumber, setFeedbackPageNumber] = useState(1);

    useEffect(() => {
        dispatch(getTestsForApprove(testsPageNumber));
    }, [testsPageNumber]);
    useEffect(() => {

        dispatch(getCodeTestsForApprove(codeTestsPageNumber));
    }, [codeTestsPageNumber]);

    useEffect(() => {
        dispatch(getFeedback(feedbackPageNumber));
    }, [feedbackPageNumber, isDelete, isConfirmed]);


    const makeDeleteFeedback = (id) => {
        dispatch(deleteFeedback(id));
    };

    const approve = (id, booleanValue) => {
        dispatch(updateIsApproved({id, booleanValue}));
    };

    if (!(roles?.includes('admin'))) {
        return <Navigate to={'/user'} replace/>;
    }

    return (
        <div className={css.admin__page}>
            <div className={rootCSS.root__background}></div>
            <div className={css.admin__wrap}>
                <div className={rootCSS.default__title_24}>
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
                        <PaginationSmall pageNumber={testsPageNumber}
                                         setPageNumber={setTestsPageNumber}
                                         pageCount={testsForApprove.meta?.pagination?.pageCount}
                        />
                    </div>

                </div>
                <div className={rootCSS.default__title_24}>
                    {EN ? 'Code tests for approve' : 'Практичні тести для затвердження'}
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
                    {codeTestPageForApprove?.data?.map(test =>
                        <Link to={`/code-test/${test.id}`} className={css.tests__block} key={test.id}>
                            <div className={css.test__name}>
                                {test?.attributes?.testName}
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
                    {codeTestPageForApprove?.data?.length === 0 &&
                        <div>{EN ? 'no code tests for approve' : 'немає практичних тестів для підтвердження'}</div>
                    }

                    <div className={css.pagination__wrap}>
                        <PaginationSmall pageNumber={codeTestsPageNumber}
                                         setPageNumber={setCodeTestsPageNumber}
                                         pageCount={codeTestPageForApprove.meta?.pagination?.pageCount}
                        />
                    </div>

                </div>
                <div className={rootCSS.default__title_24}>
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
                                                {EN ? 'approve' : 'підтвердити'}
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    )}

                    <div className={css.pagination__wrap}>
                        <PaginationSmall pageNumber={feedbackPageNumber}
                                         setPageNumber={setFeedbackPageNumber}
                                         pageCount={feedbackPage.meta?.pagination?.pageCount}
                        />
                    </div>

                </div>
                <div className={css.mentors__wrap}>
                    <UnapprovedMentors/>
                </div>
                <div className={css.mentors__wrap}>
                    <UnApprovedRecruiters/>
                </div>
                <div className={css.mentors__wrap}>
                    <PaymentRequests/>
                </div>
            </div>
        </div>
    );
};

export {AdminPage};
