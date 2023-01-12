import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import css from './TestBlock.module.css';
import completed from '../../../images/testComplete.svg';
import star_rating from '../../../images/star-rating.svg';
import coin from '../../../images/coin.svg';
import timeDisplay from '../../../RootFunctions/timeDisplay';

const TestBlock = ({test, type}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {userResultsAll} = useSelector(state => state['resultReducers']);

    const {userCodeResultsByTech} = useSelector(state => state['codeResultsReducers']);

    const currentTest = test.attributes;

    const testId = test.id;

    const [testCompleted, setTestCompleted] = useState(false);

    useEffect(() => {
        if (type === 'code') {
            let currentResult = [];
            if (userCodeResultsByTech?.length) {
                currentResult = userCodeResultsByTech?.filter(element => +element?.attributes?.codeTestId === testId);
                if (currentResult?.length) {
                    setTestCompleted(true);
                }
            }
        }
    }, [userCodeResultsByTech]);

    useEffect(() => {
        let currentResult = [];
        if (userResultsAll?.data?.length) {
            currentResult = userResultsAll?.data?.filter(element => element?.attributes?.testId === testId);
            if (currentResult?.length) {
                setTestCompleted(true);
            }
        }
    }, [userResultsAll]);

    return (
        <>
            {currentTest &&
                <Link to={type === 'code' ? `/code-test/${testId}` : `/test/${testId}`} state={currentTest.name} className={css.test__block}>
                    <div className={css.test__left}>
                        <div className={css.name_block}>
                            <h3 className={css.test__name}>{currentTest.name || currentTest.testName}</h3>
                            {
                                currentTest.isMonetized && <img src={coin} alt='coin' className={css.coin}/>
                            }
                        </div>
                        {type === 'code' &&
                            <div className={css.description}>
                                {currentTest?.description}
                            </div>
                        }
                        {type === 'code' &&
                            <div
                                className={css.test__difficult}>{EN ? 'Duration:' : 'Тривалість:'} {timeDisplay(currentTest?.timeSeconds)}
                            </div>
                        }

                        <div
                            className={css.test__difficult}>{EN ? 'Difficult:' : 'Складність:'} {currentTest?.difficult || 0}/10
                        </div>
                        {currentTest?.avgMark > 0 && <div className={css.test__rating}>
                            <img src={star_rating} alt="star"/>
                            <div> {currentTest?.avgMark || 0} </div>

                        </div>}
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
