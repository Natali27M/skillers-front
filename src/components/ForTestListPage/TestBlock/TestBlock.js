import React, {useEffect, useState} from 'react';
import css from './TestBlock.module.css';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import completed from '../../../images/testComplete.svg';

const TestBlock = (test) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {userResultsAll} = useSelector(state => state['resultReducers']);

    const currentTest = test.test.attributes;

    const testId = test.test.id;

    const [testCompleted, setTestCompleted] = useState(false);

    useEffect(() => {
        let currentResult = [];
        if (userResultsAll?.data?.length) {
            currentResult = userResultsAll?.data?.filter(element => element?.attributes?.testId === testId);

            if (currentResult.length) {
                setTestCompleted(true);
            }
        }
    }, [userResultsAll]);


    return (
        <>
            {currentTest &&
                <Link to={`/test/${testId}`} className={css.test__block}>
                    <div className={css.test__left}>
                        <div className={css.test__name}>{currentTest.name}</div>
                        <div
                            className={css.test__rating}>{EN ? 'Difficult:' : 'Складність:'} {currentTest.difficult}/10
                        </div>
                    </div>
                    {testCompleted &&
                        <img src={completed} alt={completed} className={css.complete}/>
                    }
                </Link>
            }
        </>
    );
};

export {TestBlock};