import React, {useEffect, useState} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {compileServices} from '../../services';
import {useDispatch, useSelector} from 'react-redux';
import {changeCodeResult, createCodeResult, getOneCodeResult, getOneCodeTest} from '../../store';
import css from './TestWithCodePage.module.css';
import rootCss from '../../styles/root.module.css';
import CodeEditor from '@uiw/react-textarea-code-editor';
import run_icon from '../../images/code-run.svg';
import useTimer from '../../RootFunctions/timer';
import {StartTestModal, TimeIsUpModal} from '../../components';
import timeDisplay from '../../RootFunctions/timeDisplay';
import {useForm} from 'react-hook-form';

const TestWithCodePage = () => {
    const {register, handleSubmit, reset} = useForm();

    const paramsData = useParams();

    const id = paramsData?.id?.split('-')[0];

    const resultId = paramsData?.id?.split('-')[1];

    const {user} = useSelector(state => state['userReducers']);

    const {oneCodeResult} = useSelector(state => state['codeResultsReducers']);

    const {oneCodeTest} = useSelector(state => state['codeTestReducers']);

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

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getOneCodeTest(id));
    }, []);

    useEffect(() => {
        if (resultId) {
            dispatch(getOneCodeResult(resultId));
        }
    }, [resultId]);

    useEffect(() => {
        setCode(oneCodeResult?.attributes?.userCode);
    }, [oneCodeResult]);

    useEffect(() => {
        if (testStarted && oneCodeTest) {
            setCode(oneCodeTest?.attributes?.codeFragment);
            setTime(oneCodeTest?.attributes?.timeSeconds);
            setStartTime(oneCodeTest?.attributes?.timeSeconds);
        }
    }, [oneCodeTest, testStarted]);


    useEffect(() => {
        if (startTime > 0) {
            startTimer();
        }
    }, [startTime]);

    const makeResult = () => {
        dispatch(createCodeResult({
            userId: user?.id,
            codeTestId: oneCodeTest?.id,
            userCode: code,
            techId: oneCodeTest?.attributes?.techId,
            testName: oneCodeTest?.attributes?.testName,
            evaluated: false
        }));
    };

    const tryAgain = () => {
        navigate(0);
        /*setCode(oneCodeTest?.attributes?.codeFragment);
        setTime(oneCodeTest?.attributes?.timeSeconds);
        setStartTime(oneCodeTest?.attributes?.timeSeconds);
        setError(null);
        setResult(null);
        startTimer();*/
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
    };

    if (isEvaluated) {
        return <Navigate to={'/user'} replace/>;
    }


    return (
        <div className={css.testWithCode__page}>
            {!resultId && !testStarted &&
                <StartTestModal setTestStarted={setTestStarted} test={oneCodeTest?.attributes}/>}
            {!resultId && oneCodeTest?.attributes && testStarted && time < 1 && <TimeIsUpModal tryAgain={tryAgain}/>}


            <div className={css.header}>
                <div className={css.test__name}>{oneCodeTest?.attributes?.testName}</div>

                {oneCodeResult ?
                    <div>
                        {EN ?
                            `${oneCodeResult?.attributes?.userName} result`
                            :
                            `Результат ${oneCodeResult?.attributes?.userName}`
                        }
                    </div>
                    :
                    <div className={css.countdown}>
                        {EN ? 'Remaining time:' : 'Залишок часу:'}
                        {oneCodeTest?.attributes?.timeSeconds &&
                            timeDisplay(time)
                        }
                    </div>}
            </div>

            <div className={css.description}>
                {oneCodeTest?.attributes?.description}
            </div>

            {resultId
                &&
                <form onSubmit={handleSubmit(evaluateCodeTest)} className={css.mark__form}>
                    <input
                        className={css.mark__input}
                        placeholder={EN ? 'mark' : 'оцінка'}
                        type="number" min={0} max={10}
                        {...register('authorMark')}
                    />
                    <button className={css.mark__btn}>{EN ? 'Evaluate' : 'Оцінити'}</button>
                </form>
            }

            <div className={css.main__part}>
                <div className={css.editor__wrap}>
                    <div className={css.run__btn} onClick={() => compile()}>
                        RUN <img src={run_icon} alt="run"/>
                    </div>
                    <CodeEditor
                        value={code}
                        language={'cpp'}
                        placeholder="Please enter code."
                        onChange={(evn) => setCode(evn.target.value)}
                        className={css.code__area}
                        padding={15}
                        minHeight={400}
                        style={{
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                    />
                </div>
                <div className={css.main__right}>
                    <div className={css.result}>
                        <div>{EN ? 'Expected result:' : 'Очікуваний результат:'}</div>
                        <div>{(testStarted || resultId) && oneCodeTest?.attributes?.outputResult}</div>
                    </div>
                    <div className={css.result}>
                        <div>{EN ? 'Input data:' : 'Вхідні дані:'}</div>
                        <div>{(testStarted || resultId) && oneCodeTest?.attributes?.input}</div>
                    </div>
                </div>
            </div>
            <div className={css.console}>
                <div>D:\skilliant\code-test\{(oneCodeTest?.attributes?.testName)?.toLowerCase()}></div>
                <div>{wait ? 'Wait...' : result ? result : error ? <span className={css.error}>ERROR</span> : ''}</div>
            </div>
            {!resultId && <div onClick={() => makeResult()} className={rootCss.default__button}>
                {EN ? 'Send result' : 'Надіслати результат'}
            </div>}
        </div>
    );
};

export {TestWithCodePage};