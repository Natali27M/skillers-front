import React, {useEffect, useState} from 'react';

import css from './AdminPage.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {getUserRoles} from '../../store';
import {Link, Navigate} from 'react-router-dom';
import {getTestsForApprove} from '../../store/slices/testPage.slice';


const AdminPage = () => {

    const {EN} = useSelector(state => state['languageReducers']);

    const {user, roles} = useSelector(state => state['userReducers']);

    const {testsForApprove} = useSelector(state => state['testsReducers']);

    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1);

    useEffect(()=> {
        dispatch(getTestsForApprove(pageNumber))
    }, [pageNumber])

    if (!(roles?.includes('admin'))) {
        return <Navigate to={'/user'} replace/>;
    }

    return (
        <div className={css.admin__page}>
            <div className={css.admin__wrap}>
                <div className={css.admin__title}>
                    {EN ? 'Tests for approve' : 'Тести для затвердження'}
                </div>
                <div className={css.tests__wrap}>
                    <div className={css.tests__header}>
                        <div className={css.test__name}>
                            {EN ? "Name" : 'Назва'}
                        </div>
                        <div className={css.test__difficult}>
                            {EN ? "Difficult" : 'Складність'}
                        </div>
                        <div className={css.test__difficult}>
                            {EN ? "Tech id" : 'ІД технології'}
                        </div>
                    </div>
                    {testsForApprove?.map(test =>
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
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export {AdminPage};