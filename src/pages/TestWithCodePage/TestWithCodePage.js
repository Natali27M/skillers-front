import React, {useEffect, useState} from 'react';
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import ReactStarsRating from 'react-awesome-stars-rating';
import {Helmet} from 'react-helmet-async';

import {compileServices} from '../../services';
import {
    approveCodeTest,
    changeCodeResult, clearCodeTestUserData, clearUserCodeResult, createCodeRate,
    createCodeResult, createUserAchievement, deleteCodeTest,
    getOneCodeResult,
    getOneCodeTest, getOtherUserAchievement, getUserByCodeTestRate,
    getUserResultByCodeTest, updateCodeTest, updateUserAchievement
} from '../../store';
import css from './TestWithCodePage.module.css';
import rootCss from '../../styles/root.module.css';
import testCss from '../TestPage/TestPage.module.css';
import CodeEditor from '@uiw/react-textarea-code-editor';
import run_icon from '../../images/code-run.svg';
import useTimer from '../../RootFunctions/timer';
import {SignUpModal, StartTestModal, TimeIsUpModal} from '../../components';
import timeDisplay from '../../RootFunctions/timeDisplay';

const TestWithCodePage = () => {
    const {register, handleSubmit} = useForm();

    const paramsData = useParams();

    const id = paramsData?.id?.split('-')[0];

    const resultId = paramsData?.id?.split('-')[1];

    const {user, roles} = useSelector(state => state['userReducers']);

    const {oneCodeResult, userResultByTest, status} = useSelector(state => state['codeResultsReducers']);

    const {oneCodeTest, userCodeTestRate} = useSelector(state => state['codeTestReducers']);

    const {otherUserAchievement} = useSelector(state => state['achievementsReducers']);

    const {EN} = useSelector(state => state['languageReducers']);

    const dispatch = useDispatch();

    const {time, startTimer, stopTimer, setTime} = useTimer(0);

    const [testStarted, setTestStarted] = useState(false);

    const [startTime, setStartTime] = useState(0);

    const [code, setCode] = useState('');

    const [wait, setWait] = useState(false);

    const [result, setResult] = useState(null);

    const [error, setError] = useState(null);

    const [isEvaluated, setIsEvaluated] = useState(false);

    const [testCompleted, setTestCompleted] = useState(false);

    const [registerModalOpen, setRegisterModalOpen] = useState(false);

    const [tempAuthorMark, setTempAuthorMark] = useState(null);

    const [approveCompleted, setApproveCompleted] = useState(false);

    const [bug, setBug] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (resultId && status === 'rejected') {
            setBug(true);
        }
    }, [resultId, status]);

    useEffect(() => {
        setCode(userResultByTest?.attributes?.userCode);

    }, [userResultByTest]);

    useEffect(() => {
        if (user) {
            dispatch(getUserResultByCodeTest({userId: user?.id, testId: id}));
            dispatch(getUserByCodeTestRate({userId: user?.id, testId: id}));
        } else {
            dispatch(clearCodeTestUserData());
            dispatch(clearUserCodeResult());
        }
    }, [user]);

    useEffect(() => {
        dispatch(getOneCodeTest(id));
    }, []);

    useEffect(() => {
        if (resultId) {
            dispatch(getOneCodeResult(resultId));
        }
    }, [resultId]);

    useEffect(() => {
        if (resultId && oneCodeResult) {
            setCode(oneCodeResult?.attributes?.userCode);
            dispatch(getOtherUserAchievement(oneCodeResult?.attributes?.userId));
        }
    }, [oneCodeResult]);

    useEffect(() => {
        if (testStarted && oneCodeTest && !userResultByTest) {
            setCode(oneCodeTest?.attributes?.codeFragment);
            setTime(oneCodeTest?.attributes?.timeSeconds);
            setStartTime(oneCodeTest?.attributes?.timeSeconds);
        }
    }, [oneCodeTest, testStarted]);


    const [rateValue, setRateValue] = useState(0);

    const onChange = (value) => {
        setRateValue(value);
    };

    const ReactStarsExample = ({value}) => {
        return <ReactStarsRating onChange={onChange} value={rateValue ? rateValue : value}/>;
    };

    const makeRate = () => {
        const newMarkCount = +oneCodeTest?.attributes?.markCount + 1;

        const newAllMarks = +oneCodeTest?.attributes?.allMarks + +rateValue;

        const newAvgMark = (newAllMarks / newMarkCount).toFixed(1);

        const testObj = {
            markCount: +newMarkCount,
            allMarks: +newAllMarks,
            avgMark: +newAvgMark
        };

        dispatch(updateCodeTest({testId: oneCodeTest?.id, data: testObj}));

        dispatch(createCodeRate({userId: user?.id, testId: oneCodeTest?.id, rate: +rateValue}));
    };

    useEffect(() => {
        if (startTime > 0) {
            startTimer();
        }
    }, [startTime]);

    const makeResult = () => {
        if (user) {
            dispatch(createCodeResult({
                userId: user?.id,
                codeTestId: oneCodeTest?.id,
                userCode: code,
                techId: oneCodeTest?.attributes?.techId,
                testName: oneCodeTest?.attributes?.testName,
                authorId: oneCodeTest?.attributes?.authorId,
                userName: user?.username,
                evaluated: false
            }));
        } else {
            setRegisterModalOpen(true);
        }
        stopTimer();
        setTestCompleted(true);
    };

    const tryAgain = () => {
        navigate(0);
    };

    const compile = () => {
        setWait(true);
        compileServices.judgeCompile({
            stdin: oneCodeTest?.attributes?.input,
            source_code: code,
            language_id: oneCodeTest?.attributes?.languageId
        }).then(value => {
            setResult(value?.stdout);
            setError(value?.error);
            setWait(false);
        });
    };

    const evaluateCodeTest = (obj) => {
        dispatch(changeCodeResult(
            {resultId: oneCodeResult?.id, data: {authorMark: obj?.authorMark, evaluated: true}}
        ));
        setIsEvaluated(true);
        setTempAuthorMark(obj?.authorMark);
        if (otherUserAchievement) {
            dispatch(updateUserAchievement({
                achId: otherUserAchievement.id,
                data: {
                    rating: (+otherUserAchievement?.attributes?.rating + (+oneCodeTest?.attributes?.difficult * (+obj?.authorMark / 10))).toFixed(1),
                    userName: user.username
                }
            }));
        } else {
            dispatch(createUserAchievement({
                userName: oneCodeResult?.attributes?.userName,
                userId: oneCodeResult?.attributes?.userId,
                rating: +oneCodeTest?.attributes?.difficult * (+obj?.authorMark / 10),
            }));
        }
    };


    const approve = () => {
        dispatch(approveCodeTest(oneCodeTest?.id));
        setApproveCompleted(true);
    };

    const sendDeleteTest = () => {
        dispatch(deleteCodeTest(oneCodeTest?.id));
        setApproveCompleted(true);

    };

    if (bug) {
        return <Navigate to={'/'} replace/>;
    }

    if (approveCompleted) {
        return <Navigate to={'/user'} replace/>;
    }

    const title = `${oneCodeTest?.attributes?.testName}`;
    const description = `${oneCodeTest?.attributes?.description}`;
    const url = `https://skilliant.net/code-test/${id}`;

    return (
        <div className={css.testWithCode__page}>
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

            {!userResultByTest && !resultId && !testStarted &&
                <StartTestModal setTestStarted={setTestStarted} test={oneCodeTest?.attributes}/>}
            {!userResultByTest && !resultId && oneCodeTest?.attributes && testStarted && time < 1 &&
                <TimeIsUpModal tryAgain={tryAgain}/>}


            <div className={testCss.test__page_title}>
                <div className={testCss.test__page_title__name}>{oneCodeTest?.attributes?.testName}</div>

                <div className={css.header__info}>
                    {(resultId && oneCodeResult) ?
                        <div>
                            {EN ?
                                `${oneCodeResult?.attributes?.userName} result`
                                :
                                `Результат ${oneCodeResult?.attributes?.userName}`
                            }
                        </div>
                        :
                        (userResultByTest || (testCompleted && user)) ?
                            <div>
                                <div>{EN ? 'You have already passed this test ' : 'Ви вже пройшли цей тест '}</div>
                                <div>{userResultByTest?.attributes?.authorMark
                                    ? `${EN ? 'Your result: ' : 'Ваш результат: '}${userResultByTest?.attributes?.authorMark}`
                                    : `${EN ? 'Expect an assessment from the author of the test' : 'Очікуйте оцінку від автора тесту'}`}
                                </div>
                                {userCodeTestRate ?
                                    <div className={testCss.rating__wrap}>
                                        {EN ? 'Your rate:' : 'Ваша оцінка:'} {userCodeTestRate?.attributes?.rate}
                                    </div>
                                    :
                                    <div className={testCss.rating__wrap}>
                                        <div>{EN ? 'Rate test' : 'Оцініть тест'}</div>
                                        <div className={testCss.rate__mark}>
                                            <ReactStarsExample/>
                                            <div className={testCss.user__mark}>
                                                {rateValue}
                                            </div>
                                        </div>

                                        <button className={testCss.rate__btn} onClick={() => makeRate()}>
                                            {EN ? 'Rate' : 'Оцінити'}
                                        </button>
                                    </div>
                                }
                            </div>
                            :
                            <div className={css.countdown}>
                                {EN ? 'Remaining time:' : 'Залишок часу:'}
                                {oneCodeTest?.attributes?.timeSeconds &&
                                    timeDisplay(time)
                                }
                            </div>
                    }
                </div>
            </div>

            <div className={css.description}>
                {oneCodeTest?.attributes?.description}
            </div>

            {resultId
                &&
                ((oneCodeResult?.attributes?.authorMark || isEvaluated) ?
                    <div
                        className={css.authorMark}>{EN ? 'Mark:' : 'Оцінка:'} {oneCodeResult?.attributes?.authorMark || tempAuthorMark}</div>
                    :
                    <form onSubmit={handleSubmit(evaluateCodeTest)} className={css.mark__form}>
                        <input
                            className={css.mark__input}
                            placeholder={EN ? 'mark' : 'оцінка'}
                            type="number" min={0} max={10}
                            {...register('authorMark')}
                        />
                        <button className={css.mark__btn}>{EN ? 'Evaluate' : 'Оцінити'}</button>
                    </form>)
            }

            <div className={css.main__part}>
                <div className={css.editor__wrap}>
                    <div className={css.run__btn} onClick={() => compile()}>
                        RUN <img src={run_icon} alt="run"/>
                    </div>
                    <CodeEditor
                        value={code}
                        language={oneCodeTest?.attributes?.editorLang || 'cpp'}
                        placeholder="Please enter code"
                        onChange={(evn) => setCode(evn.target.value)}
                        className={css.code__area}
                        padding={15}
                        minHeight={400}
                        style={{
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                    />
                </div>
                {(oneCodeTest?.attributes?.outputResult || oneCodeTest?.attributes?.input) &&
                    <div className={css.main__right}>
                        {oneCodeTest?.attributes?.outputResult &&
                            <div className={css.result}>
                                <div>{EN ? 'Expected result:' : 'Очікуваний результат:'}</div>
                                <div>{(testStarted || resultId || userResultByTest) && oneCodeTest?.attributes?.outputResult}</div>
                            </div>
                        }
                        {oneCodeTest?.attributes?.input &&
                            <div className={css.result}>
                                <div>{EN ? 'Input data:' : 'Вхідні дані:'}</div>
                                <div>{(testStarted || resultId || userResultByTest) && oneCodeTest?.attributes?.input}</div>
                            </div>
                        }
                    </div>
                }
            </div>
            <div className={css.console}>
                <div>D:\skilliant\code-test\{(oneCodeTest?.attributes?.testName)?.toLowerCase()}></div>
                <div>{wait ? 'Wait...' : result ? result : error ? <span className={css.error}>ERROR</span> : ''}</div>
            </div>
            {!testCompleted && !userResultByTest && !resultId ?
                <div onClick={() => makeResult()} className={rootCss.default__button}>
                    {EN ? 'Send result' : 'Надіслати результат'}
                </div>
                :
                <Link to={'/'} className={rootCss.default__button}>{EN ? 'To main' : 'На головну'}</Link>
            }
            {registerModalOpen && <SignUpModal setModalOpen={setRegisterModalOpen}/>}
            {(!oneCodeTest?.attributes?.isApproved) && (roles?.includes('admin')) &&
                <div className={testCss.approve__block}>
                    <button className={testCss.approve__btn} onClick={() => approve()}>approve</button>
                    <button className={testCss.delete__btn} onClick={() => sendDeleteTest()}>delete</button>
                </div>
            }
        </div>
    );
};

export {TestWithCodePage};
