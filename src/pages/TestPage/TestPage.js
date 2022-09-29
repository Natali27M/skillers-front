import React, {useEffect, useState} from 'react';
import {Link, useLocation, useParams, Navigate} from 'react-router-dom';
import css from './TestPage.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {approveTest, deleteTest, getOneTest} from '../../store/slices/testPage.slice';
import {checkResults, clear, clearResults, getExercises, makeTimeToPush, setTestComplete} from '../../store';
import {ExerciseBlock} from '../../components';
import {createUserAchievement, getUserAchievement, updateUserAchievement} from '../../store/slices/achievments.slice';
import {createUserResult, getUserByTestResults} from '../../store';

const TestPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {oneTest} = useSelector(state => state['testsReducers']);
    const {exercises, result, timeToPush, checked, status} = useSelector(state => state['exercisesReducers']);
    const {user, roles} = useSelector(state => state['userReducers']);
    const {userAchievement} = useSelector(state => state['achievementsReducers']);

    const {userByTestResult, isTestCompleted} = useSelector(state => state['resultReducers']);

    const {testId} = useParams();
    const dispatch = useDispatch();
    const {pathname} = useLocation();

    useEffect(() => {
        dispatch(getOneTest({testId}));
        dispatch(getExercises({testId}));
    }, []);

    useEffect(() => {
        if (user) {
            dispatch(getUserByTestResults({userId: user.id, testId}));
        }
    }, [user]);

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
            dispatch(getUserAchievement(user.id))
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

    const [approveCompleted, setApproveCompleted] = useState(false);


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
            <div className={css.test__page_title}>{oneTest.attributes?.name}</div>
            {isTestCompleted &&
                <div className={css.result__block}>
                    {EN ? 'You have already passed this test, your result: ' : 'Ви вже пройшли цей тест, ваш результат: '}
                    {userByTestResult[0].attributes.correctAnswer}
                    /
                    {userByTestResult[0].attributes.allExercises}
                </div>
            }
            {!!exercises.length && status !== 'pending' &&
                <div className={css.exercises__wrap}>
                    {exercises.map(exercise => <ExerciseBlock exNumber={exercises.indexOf(exercise) +1} key={exercise.id} exercise={exercise}/>)}
                </div>
            }

            {!checked && status !== 'pending' && !isTestCompleted && <div className={css.check__wrap}>
                <button className={css.check__btn}
                        onClick={() => dispatch(makeTimeToPush())}>{EN ? 'CHECK' : 'ПЕРЕВІРИТИ'}</button>
            </div>}
            {result &&
                <div className={css.result__wrap}>
                    <div className={css.result__block}>
                        {EN ? 'Your result:' : 'Ваш результат:'} {result.correct} {EN ? 'from' : 'з'} {result.allExercises}
                    </div>
                    <Link to={'/'} className={css.check__btn}>{EN ? 'TO MAIN' : 'НА ГОЛОВНУ'}</Link>
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