import React, {useEffect, useState} from 'react';
import {Link, useLocation, useParams, Navigate, useNavigate} from 'react-router-dom';
import css from './TestPage.module.css';
import {useDispatch, useSelector} from 'react-redux';
import ReactStarsRating from 'react-awesome-stars-rating';
import {
    approveTest,
    createRateOfTest,
    deleteTest,
    getOneTest,
    getRateOfTest,
    rateTest
} from '../../store/slices/testPage.slice';
import {checkResults, clear, clearResults, getExercises, makeTimeToPush, setTestComplete} from '../../store';
import {BackButton, ExerciseBlock} from '../../components';
import {createUserAchievement, getUserAchievement, updateUserAchievement} from '../../store/slices/achievments.slice';
import {createUserResult, getUserByTestResults} from '../../store';
import star__rating from '../../images/star-rating.svg';
import ScrollToTop from '../../RootFunctions/scrollUp';

const TestPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {oneTest, userTestRate} = useSelector(state => state['testsReducers']);
    const {
        exercises,
        result,
        timeToPush,
        checked,
        testFailed,
        status
    } = useSelector(state => state['exercisesReducers']);
    const {user, roles} = useSelector(state => state['userReducers']);
    const {userAchievement} = useSelector(state => state['achievementsReducers']);

    const {userByTestResult, isTestCompleted} = useSelector(state => state['resultReducers']);

    const {testId} = useParams();
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const [timeToUpdateTest, setTimeToUpdateTest] = useState(false);

    useEffect(() => {
        dispatch(getExercises({testId}));
    }, []);


    useEffect(() => {
        dispatch(getOneTest({testId}));
    }, [timeToUpdateTest]);

    useEffect(() => {
        if (user) {
            dispatch(getUserByTestResults({userId: user?.id, testId}));
            dispatch(getRateOfTest({testId, userId: user?.id}));
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
        if (timeToPush) {
            dispatch(checkResults());
        }
    }, [timeToPush]);

    useEffect(() => {
        if (result && user && oneTest?.attributes?.isApproved) {
            const correctPart = +result.correct / result.allExercises;
            const rating = (correctPart === Infinity || isNaN(correctPart) ? 0 : oneTest.attributes.difficult * correctPart).toFixed(1);
            dispatch(getUserAchievement(user.id));
            if (userAchievement) {
                dispatch(updateUserAchievement({
                    achId: userAchievement.id,
                    data: {
                        rating: +userAchievement?.attributes?.rating + (+rating),
                        userName: user.username
                    }
                }));
            } else {
                dispatch(createUserAchievement({userName: user.username, userId: user.id, rating}));
            }
            dispatch(createUserResult({
                    testName: oneTest.attributes.name,
                    testId: oneTest.id,
                    userId: user.id,
                    correctAnswer: result.correct,
                    allExercises: result.allExercises
                }
            ));
        }
    }, [result]);

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

    if (approveCompleted) {
        return <Navigate to={'/'} replace/>;
    }

    const approve = () => {
        dispatch(approveTest(oneTest?.id));
        setApproveCompleted(true);
    };

    const sendDeleteTest = () => {
        dispatch(deleteTest(oneTest?.id));
        setApproveCompleted(true);

    };

    if (oneTest?.attributes) {
        if (!(oneTest?.attributes?.isApproved) && !(roles?.includes('admin'))) {
            return <Navigate to={'/'} replace/>;
        }
    }

    return (
        <div className={css.test__page}>
            <div className={css.test__page_title}>
                <div>{oneTest?.attributes?.name}</div>
                <div className={css.title__rating}>
                    <div>{EN ? 'Rating' : 'Рейтинг'}: {oneTest?.attributes?.avgMark || 0}</div>
                    <img src={star__rating} alt="star"/>
                </div>
            </div>
            <div className={css.back__btn_wrap}>
                <BackButton/>
            </div>
            {testFailed &&
                <div className={css.failed__test}>
                    <div>
                        {EN ? '' +
                        'Test failed, you scored less than 80%'
                        :
                        'Тест провалено, ви набрали менше 80% балів'}
                    </div>
                    <button onClick={() => navigate(0)} className={css.try__again_btn}>
                        {EN ? 'Try again' : 'Спробувати ще раз'}
                    </button>
                </div>
            }
            {isTestCompleted &&
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
                        </div>}
                </div>

            }
            {!!exercises?.length && status !== 'pending' &&
                <div className={css.exercises__wrap}>
                    {exercises.map(exercise => <ExerciseBlock exNumber={exercises.indexOf(exercise) + 1}
                                                              key={exercise.id} exercise={exercise}/>)}
                </div>
            }

            {!checked && status !== 'pending' && !isTestCompleted && <div className={css.check__wrap}>
                <button className={css.check__btn}
                        onClick={() => dispatch(makeTimeToPush())}>{EN ? 'CHECK' : 'ПЕРЕВІРИТИ'}</button>
            </div>}
            {result &&
                <div className={css.result__wrap}>
                    <div className={css.result__left}>
                        <div className={css.result__block}>
                            {EN ? 'Your result:' : 'Ваш результат:'} {result?.correct} {EN ? 'from' : 'з'} {result?.allExercises}
                        </div>
                        <Link to={'/'} className={css.check__btn}>{EN ? 'TO MAIN' : 'НА ГОЛОВНУ'}</Link>
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