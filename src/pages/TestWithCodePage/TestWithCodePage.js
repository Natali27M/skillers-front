import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {compileServices} from '../../services';
import {useDispatch, useSelector} from 'react-redux';
import {createCodeResult, getOneCodeTest} from '../../store';
import css from './TestWithCodePage.module.css';
import rootCss from '../../styles/root.module.css';
import CodeEditor from '@uiw/react-textarea-code-editor';
import run_icon from '../../images/code-run.svg';
import useTimer from '../../RootFunctions/timer';
import {StartTestModal, TimeIsUpModal} from '../../components';
import timeDisplay from '../../RootFunctions/timeDisplay';

const TestWithCodePage = () => {
    const {id} = useParams();

    const {user, roles} = useSelector(state => state['userReducers']);

    const dispatch = useDispatch();

    const {oneCodeTest} = useSelector(state => state['codeTestReducers']);

    const {EN} = useSelector(state => state['languageReducers']);

    const {time, startTimer, setTime} = useTimer(0);

    const [testStarted, setTestStarted] = useState(false);

    const [startTime, setStartTime] = useState(0);

    const [code, setCode] = useState('');

    const [wait, setWait] = useState(false);

    const [result, setResult] = useState(null);

    const [error, setError] = useState(null);

    useEffect(() => {
        dispatch(getOneCodeTest(id));
    }, []);

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
            testName: oneCodeTest?.attributes?.testName
        }));
    };

    const tryAgain = () => {
        setCode(oneCodeTest?.attributes?.codeFragment);
        setTime(oneCodeTest?.attributes?.timeSeconds);
        setStartTime(oneCodeTest?.attributes?.timeSeconds);
        setError(null);
        setResult(null);
        startTimer();
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


    return (
        <div className={css.testWithCode__page}>
            {!testStarted && <StartTestModal setTestStarted={setTestStarted} test={oneCodeTest?.attributes}/>}
            {oneCodeTest?.attributes && testStarted && time < 1 && <TimeIsUpModal tryAgain={tryAgain}/>}

            <div className={css.header}>
                <div className={css.test__name}>{oneCodeTest?.attributes?.testName}</div>
                <div className={css.countdown}>
                    {EN ? 'Remaining time:' : 'Залишок часу:'}
                    {oneCodeTest?.attributes?.timeSeconds &&
                        timeDisplay(time)
                    }
                </div>
            </div>

            <div className={css.description}>
                {oneCodeTest?.attributes?.description}
            </div>


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
                        <div>{testStarted && oneCodeTest?.attributes?.outputResult}</div>
                    </div>
                    <div className={css.result}>
                        <div>{EN ? 'Input data:' : 'Вхідні дані:'}</div>
                        <div>{testStarted && oneCodeTest?.attributes?.input}</div>
                    </div>
                </div>
            </div>
            <div className={css.console}>
                <div>D:\skilliant\code-test\{(oneCodeTest?.attributes?.testName)?.toLowerCase()}></div>
                <div>{wait ? 'Wait...' : result ? result : error ? <span className={css.error}>ERROR</span> : ''}</div>
            </div>
            <div onClick={() => makeResult()} className={rootCss.default__button}>
                {EN ? 'Send result' : 'Надіслати результат'}
            </div>
        </div>
    );
};

export {TestWithCodePage};