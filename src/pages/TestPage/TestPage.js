import React, {useEffect, useState} from 'react';
import {Link, Navigate, useLocation, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import ReactStarsRating from 'react-awesome-stars-rating';
import {useForm} from 'react-hook-form';
import {Helmet} from 'react-helmet-async';

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
    clearResults, createPost,
    createUserResult,
    getFullTestResult,
    getProxyExercises, getTechnology, getUserBadges,
    getUserByTestResults,
    makeTimeToPush,
    setTestComplete
} from '../../store';
import {BackButton, ExerciseBlock, SignUpModal} from '../../components';
import {createUserAchievement, getUserAchievement, updateUserAchievement} from '../../store';
import star__rating from '../../images/star-rating.svg';
import lock from '../../images/lock.svg';
import coin from '../../images/coin.svg';
import cross from '../../images/cross.svg';
import {userServices} from '../../services';
import badgesProcessing from '../../RootFunctions/badgesProcessing';

const TestPage = () => {
    const [coins, setCoins] = useState(0);

    const {EN} = useSelector(state => state['languageReducers']);

    const {oneTest, userTestRate} = useSelector(state => state['testsReducers']);

    const {technology} = useSelector(state => state['technologiesReducers']);

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

    const {userByTestResult, isTestCompleted} = useSelector(state => state['resultReducers']);

    const {userBadges} = useSelector(state => state['badgesReducers']);

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

    const {reset} = useForm();

    const location = useLocation();

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
            const resultToPush = {
                testName: oneTest.attributes.name,
                testId: oneTest.id,
                userId: user.id,
                techId: oneTest.attributes.techId,
                correctAnswer: result.correct,
                allExercises: result.allExercises
            };

            // dispatch(createUserResult(resultToPush));
            badgesProcessing(user.id, resultToPush, userBadges?.id);
            dispatch(getUserBadges(user.id));
            dispatch(getTechnology(oneTest?.attributes?.techId));

            setModalResult(true);
        } else if (result && !user) {
            setModalOpen(true);
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
        if (oneTest?.attributes?.difficultCount === null) {
            newDifficultCount = 2;
        } else {
            newDifficultCount = +oneTest?.attributes?.difficultCount + 1;
        }

        if (oneTest?.attributes?.allDifficults === null) {
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
    };

    const title = `${oneTest?.attributes ? oneTest.attributes.name : location.state}`;
    const description = 'All information about the test (title, description, rating, coin)  and multiple-choice test questions';
    const url = `https://skilliant.net/test/${oneTest?.id}`;

    const sharePost = () => {
        const postResult = {
            type: 'achievement',
            techName: technology?.data?.attributes.name,
            testName: oneTest.attributes.name,
            correctAnswer: result.correct,
            allExercises: result.allExercises
        }

        const newPost = {
            userId: user.id,
            post: postResult
        }
        dispatch(createPost(newPost));
        navigate('/community');
    }

    return (
        <div className={css.test__page}>
            <Helmet>
                <meta charSet="utf-8"/>
                <meta name="description" content={description}/>
                <meta property="og:url" content={url}/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="skilliant.net"/>
                <title>{title}</title>
                <link rel="canonical" href={url}/>
            </Helmet>

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
                            {EN ? 'Our congratulations !' : 'Наші вітання !'}
                        </div>

                        <div className={css.result__left}>
                            <div className={css.result__block}>
                                <div>{EN ? 'Your result:' : 'Ваш результат:  '} {result?.correct} {EN ? 'from' : 'з  '} {result?.allExercises}</div>
                                {
                                    ((100 * result.correct) / result.allExercises) > oneTest?.attributes?.monetizedPercent && oneTest?.attributes?.isMonetized &&
                                    <div className={css.coin__result__get}>
                                        <div>{EN ? 'You got a coin  ' : 'Ви отримали монетку   '}</div>
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
                        {/* <div className={css.box__rating_difficult}>
                            <div>
                                {EN ? 'How difficult did you find this test?' : 'Наскільки важким для вас видався цей тест?'}
                            </div>
                            <form onSubmit={handleSubmit(changeDifficult)}  className={css.box__rating_form}>
                                <input
                                    type="number"
                                    {...register('difficult')}
                                    min="1" max="10"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    className={css.difficult__input}
                                />
                                <button className={css.rate__btn}>{EN ? 'Send' : 'Надіслати'}</button>
                            </form>
                        </div>*/}

                        <div className={css.community__block}>
                            <div>Share the result on the Skilliant platform</div>
                            <button className={css.community__btn} onClick={() => sharePost()}>Send</button>
                        </div>

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
