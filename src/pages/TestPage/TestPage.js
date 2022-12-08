import React, {useEffect, useState} from 'react';
import {Link, Navigate, useLocation, useNavigate, useParams} from 'react-router-dom';
import css from './TestPage.module.css';
import {useDispatch, useSelector} from 'react-redux';
import ReactStarsRating from 'react-awesome-stars-rating';
import {useForm} from 'react-hook-form';

import css from './TestPage.module.css';
import {
    approveTest,
    createRateOfTest,
    deleteTest,
    getOneTest,
    getRateOfTest,
    rateTest,
    difficultTest
} from '../../store/slices/testPage.slice';
import {
    checkProxyResults,
    clear,
    clearResults,
    createUserResult,
    getFullTestResult,
    getProxyExercises,
    getUserByTestResults,
    makeTimeToPush,
    setTestComplete
} from '../../store';
import {BackButton, ExerciseBlock, SignUpModal} from '../../components';
import {createUserAchievement, getUserAchievement, updateUserAchievement} from '../../store/slices/achievments.slice';
import star__rating from '../../images/star-rating.svg';
import lock from '../../images/lock.svg';
import coin from '../../images/coin.svg';
import cross from '../../images/cross.svg';
import {userServices} from '../../services';

const TestPage = () => {
    const [coins, setCoins] = useState(0);

    const {EN} = useSelector(state => state['languageReducers']);
    const {oneTest, userTestRate} = useSelector(state => state['testsReducers']);
    const {
        exercises,
        result,
        timeToPush,
        checked,
        testFailed,
        status,
        variants
    } = useSelector(state => state['exercisesReducers']);
    const {user, roles} = useSelector(state => state['userReducers']);
    const {userAchievement} = useSelector(state => state['achievementsReducers']);

    console.log(userAchievement);

    const {userByTestResult, isTestCompleted} = useSelector(state => state['resultReducers']);

    const paramsData = useParams();

    const hrUserId = paramsData?.testId?.split('-')[1];

    const testId = paramsData?.testId?.split('-')[0];

    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const defaultPercent = 51;

    const [timeToUpdateTest, setTimeToUpdateTest] = useState(false);

    const [userForHr, setUserForHr] = useState({});

    const [modalOpen, setModalOpen] = useState(false);

    const [modalResult, setModalResult] = useState(false);

    const {register, handleSubmit, reset} = useForm();

    useEffect(() => {
        if (hrUserId) {
            userServices.getUserById(hrUserId).then(value => setUserForHr(value));
        }
    }, [hrUserId]);

    useEffect(() => {
        if (isTestCompleted || hrUserId) {
            dispatch(getFullTestResult({userId: hrUserId ? hrUserId : user?.id, testId}));
        }
    }, [isTestCompleted, hrUserId]);

    useEffect(() => {
        dispatch(getProxyExercises({testId}));
    }, [testId]);

    useEffect(() => {
        dispatch(getOneTest({testId}));
    }, [timeToUpdateTest]);

    useEffect(() => {
        if (user) {
            dispatch(getUserByTestResults({userId: hrUserId ? hrUserId : user?.id, testId}));
            dispatch(getRateOfTest({testId, userId: hrUserId ? hrUserId : user?.id}));
        }
    }, [user, timeToUpdateTest]);

    useEffect(() => {
        if (userByTestResult?.length > 0) {
            dispatch(setTestComplete());
        }
    }, [userByTestResult]);

    useEffect(() => {
        dispatch(clear());
        dispatch(clearResults());
    }, [pathname]);

    useEffect(() => {
        if (timeToPush && !!variants.length) {
            dispatch(checkProxyResults({
                variants,
                testId: oneTest.id,
                percent: oneTest?.attributes?.correctPercent || defaultPercent,
                userId: user?.id || null
            }));
        }
    }, [timeToPush, variants.length]);


    useEffect(() => {
        if (result && user) {
            let myCorrectPercent = (100 * result.correct) / result.allExercises;
            if (myCorrectPercent > oneTest?.attributes?.monetizedPercent && oneTest?.attributes?.isMonetized) {
                setCoins(1);
            }
            const correctPart = +result.correct / result.allExercises;
            const rating = (correctPart === Infinity || isNaN(correctPart) ? 0 : oneTest.attributes.difficult * correctPart).toFixed(1);
            dispatch(getUserAchievement(user.id));
            if (!oneTest?.attributes?.isPrivate) {
                if (userAchievement) {
                    dispatch(updateUserAchievement({
                        achId: userAchievement.id,
                        data: {
                            rating: (+userAchievement?.attributes?.rating + (+rating)).toFixed(1),
                            userName: user.username,
                            coins: userAchievement?.attributes?.coins + coins,
                        }
                    }));
                } else {
                    dispatch(createUserAchievement({
                        userName: user.username,
                        userId: user.id,
                        rating: rating,
                        coins: coins,
                    }));
                }
            }
            dispatch(createUserResult({
                    testName: oneTest.attributes.name,
                    testId: oneTest.id,
                    userId: user.id,
                    techId: oneTest.attributes.techId,
                    correctAnswer: result.correct,
                    allExercises: result.allExercises
                }
            ));
            setModalResult(true);
        } else if (result && !user) {
            setModalOpen(true);
        }

    }, [result, coins]);


    useEffect(() => {
        if (testFailed) {
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 100);
        }
    }, [testFailed]);

    const [approveCompleted, setApproveCompleted] = useState(false);

    const [rateValue, setRateValue] = useState(0);

    const onChange = (value) => {
        setRateValue(value);
    };

    const ReactStarsExample = ({value}) => {
        return <ReactStarsRating onChange={onChange} value={rateValue ? rateValue : value}/>;
    };

    const makeRate = () => {
        const newMarkCount = +oneTest?.attributes?.markCount + 1;

        const newAllMarks = +oneTest?.attributes?.allMarks + +rateValue;

        const newAvgMark = (newAllMarks / newMarkCount).toFixed(1);

        const testObj = {
            markCount: newMarkCount,
            allMarks: newAllMarks,
            avgMark: +newAvgMark
        };

        dispatch(rateTest({testId: oneTest?.id, testObj}));

        dispatch(createRateOfTest({userId: user?.id, testId: oneTest?.id, rate: +rateValue}));

        setTimeout(() => {
            setTimeToUpdateTest(!timeToUpdateTest);
        }, 500);
    };


    /*    if ((!(roles?.includes('admin')) && oneTest?.attributes?.authorId !== user?.id) && hrUserId) {
            return <Navigate to={`/user`} replace/>;
        }*/


    if (approveCompleted) {
        return <Navigate to={'/user'} replace/>;
    }

    const approve = () => {
        dispatch(approveTest(oneTest?.id));
        setApproveCompleted(true);
    };

    const sendDeleteTest = () => {
        dispatch(deleteTest(oneTest?.id));
        setApproveCompleted(true);

    };

    const changeDifficult = (obj) => {
        let newDifficultCount;
        let newAllDifficults;
        if(oneTest?.attributes?.difficultCount === null) {
            newDifficultCount = 2;
        } else {
            newDifficultCount = +oneTest?.attributes?.difficultCount + 1;
        }

        if(oneTest?.attributes?.allDifficults === null) {
            newAllDifficults = +oneTest?.attributes?.difficult + +obj.difficult;
        } else {
            newAllDifficults = +oneTest?.attributes?.allDifficults + +obj.difficult;
        }

        const newDifficult = Math.round(newAllDifficults / newDifficultCount);

        const difficultObj = {
            difficultCount: newDifficultCount,
            allDifficults: newAllDifficults,
            difficult: newDifficult
        };
        dispatch(difficultTest({testId: oneTest?.id, difficultObj}));

        reset();
    }

    return (
        <div className={css.test__page}>
            {modalOpen && <SignUpModal setModalOpen={setModalOpen} type="test"/>}
            <div className={css.test__page_title}>
                <div className={css.test__page_title__name}>{oneTest?.attributes?.name}
                    {oneTest?.attributes?.isMonetized &&
                        <img src={coin} alt="coin" style={{width: '22px', height: '22px'}}/>}
                </div>
                <div className={css.title__rating}>
                    <div>{EN ? 'Rating' : 'Рейтинг'}: {oneTest?.attributes?.avgMark || 0}</div>
                    <img src={star__rating} alt="star"/>
                </div>
            </div>
            <div className={css.back__btn_wrap}>
                <BackButton/>
            </div>
            <div className={css.test__info_wrap}>
                <div className={css.test__info_wrap__percent}>
                    <div>{EN ? 'Min. result, %: ' : 'Мін. результат, %: '}{oneTest?.attributes?.correctPercent || defaultPercent}</div>
                    {oneTest?.attributes?.monetizedPercent &&
                        <div>{EN ? 'Coin get result, %: ' : 'Результат отримання монетки, %: '}{oneTest?.attributes?.monetizedPercent}</div>}
                </div>
                {!!oneTest?.attributes?.isPrivate && <div className={css.private__wrap}>
                    <img className={css.private__img} src={lock} alt="lock"/>
                    <div>{EN ? 'Private test' : 'Приватний тест'}</div>
                </div>}
            </div>

            {testFailed &&
                <div className={css.failed__test}>
                    <div>
                        {EN ? '' +
                            `Test failed, you scored less than ${oneTest?.attributes?.correctPercent || defaultPercent}%`
                            :
                            `Тест провалено, ви набрали менше ${oneTest?.attributes?.correctPercent || defaultPercent}% балів`}
                    </div>
                    <button onClick={() => navigate(0)} className={css.try__again_btn}>
                        {EN ? 'Try again' : 'Спробувати ще раз'}
                    </button>
                </div>
            }
            {isTestCompleted && !hrUserId &&
                <div className={css.completed__header}>
                    <div className={css.result__block}>
                        {EN ? 'You have already passed this test, your result: ' : 'Ви вже пройшли цей тест, ваш результат: '}
                        {userByTestResult[0]?.attributes?.correctAnswer}
                        /
                        {userByTestResult[0]?.attributes?.allExercises}
                    </div>
                    {userTestRate ?
                        <div className={css.rating__wrap}>
                            {EN ? 'Your rate:' : 'Ваша оцінка:'} {userTestRate?.attributes?.rate}
                        </div>
                        :
                        <div className={css.rating__wrap}>
                            <div>{EN ? 'Rate test' : 'Оцініть тест'}</div>
                            <div className={css.rate__mark}>
                                <ReactStarsExample/>
                                <div className={css.user__mark}>
                                    {rateValue}
                                </div>
                            </div>

                            <button className={css.rate__btn} onClick={() => makeRate()}>
                                {EN ? 'Rate' : 'Оцінити'}
                            </button>
                        </div>
                    }
                </div>
            }
            {
                isTestCompleted && hrUserId &&
                <div className={css.completed__header}>
                    <div className={css.result__block}>
                        {EN ? `User ${userForHr?.username} result: ` : `Результат користувача ${userForHr?.username}: `}
                        {userByTestResult[0]?.attributes?.correctAnswer}
                        /
                        {userByTestResult[0]?.attributes?.allExercises}
                    </div>
                </div>
            }
            {!!exercises?.length && status !== 'pending' &&
                <div className={css.exercises__wrap}>
                    {exercises.map(exercise => <ExerciseBlock exNumber={exercises.indexOf(exercise) + 1}
                                                              key={exercise.id} exercise={exercise}/>)}
                </div>
            }

            {!checked && !hrUserId && status !== 'pending' && !isTestCompleted && <div className={css.check__wrap}>
                <button className={css.check__btn}
                        onClick={() => dispatch(makeTimeToPush())}>{EN ? 'CHECK' : 'ПЕРЕВІРИТИ'}</button>
            </div>}

            {result &&
                <div className={css.result__check__btn}>
                    <Link to={'/'} className={css.check__btn}>{EN ? 'TO MAIN' : 'НА ГОЛОВНУ'}</Link>
                </div>
            }

            {result && modalResult &&
                <div className={css.modal__result} onClick={() => setModalResult(!modalResult)}>
                    <div className={css.result__wrap} onClick={e => e.stopPropagation()}>
                        <img src={cross} alt="cross" className={css.result__wrap__cross}
                             onClick={() => setModalResult(!modalResult)}/>

                        <div className={css.result__left__congratulations}>
                            {EN ? "Our congratulations !" : "Наші вітання !"}
                        </div>

                        <div className={css.result__left}>
                            <div className={css.result__block}>
                                <div>{EN ? 'Your result:' : 'Ваш результат:  '} {result?.correct} {EN ? 'from' : 'з  '} {result?.allExercises}</div>
                                {
                                    ((100 * result.correct) / result.allExercises) > oneTest?.attributes?.monetizedPercent && oneTest?.attributes?.isMonetized &&
                                    <div className={css.coin__result__get}>
                                        <div>{EN ? "You got a coin  " : "Ви отримали монетку   "}</div>
                                        <img src={coin} alt="coin" style={{width: '24px', height: '24px'}}/>
                                    </div>
                                }
                            </div>
                        </div>
                        {user &&
                            <>
                                {userTestRate ?
                                    <div className={css.rating__wrap}>
                                        {EN ? 'Your rate:' : 'Ваша оцінка:'} {userTestRate?.attributes?.rate}
                                    </div>
                                    :
                                    <div className={css.rating__wrap}>
                                        <div>{EN ? 'Rate test' : 'Оцініть тест'}</div>
                                        <ReactStarsExample/>
                                        <div className={css.user__mark}>
                                            {rateValue}
                                        </div>
                                        <button className={css.rate__btn} onClick={() => makeRate()}>
                                            {EN ? 'Rate' : 'Оцінити'}
                                        </button>
                                    </div>
                                }
                            </>
                        }
                        <div>
                            <Link to={'/'} className={css.check__btn}>{EN ? 'TO MAIN' : 'НА ГОЛОВНУ'}</Link>
                        </div>
                    </div>
                </div>
            }

            {(!oneTest?.attributes?.isApproved) && (roles?.includes('admin')) &&
                <div className={css.approve__block}>
                    <button className={css.approve__btn} onClick={() => approve()}>approve</button>
                    <button className={css.delete__btn} onClick={() => sendDeleteTest()}>delete</button>
                </div>
            }
        </div>
    );
};

export {TestPage};
