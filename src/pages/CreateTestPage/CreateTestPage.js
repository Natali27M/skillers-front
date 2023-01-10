import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi/dist/joi';
import {Helmet} from 'react-helmet';

import css from './CreateTestPage.module.css';
import rootCss from '../../styles/root.module.css';
import headerCss from '../../components/GeneralComponents/Header/Header.module.css';
import {TestNameValidator} from '../../validation';
import {ExBlock, TechDropdown} from '../../components';
import {
    createExercise,
    createTempTest,
    createTest,
    createTimeToClear,
    deleteVariantFromArray,
    sendExercise,
    sendVariant
} from '../../store';
import {Link, Navigate} from 'react-router-dom';
import lock from '../../images/lock.svg';
import coin from '../../images/coin.svg';

const CreateTestPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {user, jwt} = useSelector(state => state['userReducers']);

    const {
        tempTest,
        technology,
        testId,
        tempArray,
        variants,
        exercises,
        completedEx
    } = useSelector(state => state['createTestsReducers']);

    const [isTech, setIsTech] = useState(true);

    const [isComplete, setIsComplete] = useState(false);

    const [monetize, setMonetize] = useState(false);

    const [testLng, setTestLng] = useState(true);

    const dispatch = useDispatch();

    const addExBlock = () => {
        dispatch(createExercise());
    };

    const {
        register, handleSubmit, formState: {errors}, reset
    } = useForm({resolver: joiResolver(TestNameValidator)});

    const sendTest = (obj) => {
        if (!technology) {
            setIsTech(false);
        } else {
            dispatch(createTempTest({
                ...obj,
                ukrLng: !testLng,
                techId: technology.id,
                testTempId: `test${Date.now()}`
            }));
            setIsTech(true);
        }
        reset();
    };

    useEffect(() => {
        dispatch(createTimeToClear());
    }, [isComplete]);

    useEffect(() => {
        if (testId) {
            exercises.map(ex => {
                dispatch(sendExercise({
                    data: {testId, description: ex.description, code: ex.code},
                    tempId: ex.exTempId
                }));
            });
        }
    }, [testId, monetize]);

    useEffect(() => {
        if (completedEx?.length === exercises.length) {
            for (const variant of variants) {
                const targetEx = completedEx.filter(ex => ex.tempId === variant.exTempId)[0];
                dispatch(sendVariant({
                        exerciseId: targetEx?.exerciseId,
                        exercise: targetEx?.exerciseId,
                        text: variant.text,
                        correct: variant.correct
                    }
                ));
                if (variants.indexOf(variant) === variants.length - 1) {
                    setIsComplete(true);
                }
                dispatch(deleteVariantFromArray(variant.varTempId));
                setTimeout(() => {
                    setIsComplete(true);
                }, 1000);
            }
        }
    }, [completedEx]);


    const sendNormTest = () => {
        dispatch(createTest({
            name: tempTest.name,
            difficult: tempTest.difficult,
            techId: tempTest.techId,
            isApproved: false,
            ukrLng: tempTest?.ukrLng,
            authorId: user?.id,
            isPrivate: tempTest?.isPrivate ? true : null,
            correctPercent: tempTest?.correctPercent,
            isMonetized: tempTest?.isMonetized ? true : null,
            monetizedPercent: tempTest?.monetizedPercent ? tempTest?.monetizedPercent : null,
        }));
        setTimeout(() => {
            if (exercises.length === 0) {
                setIsComplete(true);
            }
            if (variants.length === 0) {
                setIsComplete(true);
            }
        }, 100);

    };

    if (isComplete && testId) {
        return <Navigate to={`/test/${testId}`} replace/>;
    }

    if (!user) {
        return <Navigate to={'/login'} replace/>;
    }

    const title = 'Create quiz';
    const description = 'Form for creating a test with a choice of category, difficulty, min.result, private, monetize';
    const url = 'https://skilliant.net/createTest';

    return (
        <div className={css.createTest__page}>
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

            <div className={css.createTest__bg}></div>
            <div className={css.createTest__wrap}>
                {tempTest ?
                    <>
                        <div className={css.test__header}>
                            <div className={css.test__name}>{tempTest?.name}</div>
                            <div className={css.test__name_technology}>{technology?.attributes.name}</div>
                            {!!tempTest.isPrivate && <div className={css.private__wrap}>
                                <img className={css.private__img} src={lock} alt="lock"/>
                                <div>{EN ? 'Private test' : 'Приватний тест'}</div>
                            </div>}
                            {!!tempTest.isMonetized && <div className={css.private__wrap}>
                                <img src={coin} alt="coin" style={{width: '22px', height: '22px'}}/>
                                <div>{EN ? 'Monetized' : 'Монетизований'}</div>
                            </div>}
                            <div
                                className={css.test__difficult}>{EN ? 'Difficult : ' : 'Складність : '} {tempTest?.difficult}
                            </div>
                            <div className={css.test__difficult}>
                                {EN ? 'Min. result, % : ' : 'Мін. результат, % : '} {tempTest?.correctPercent}
                            </div>
                            {!!tempTest.monetizedPercent && <div className={css.test__difficult}>
                                {EN ? 'Min. result to get coin, % : '
                                    : 'Мін. результат для отримання монети, % : '} {tempTest?.monetizedPercent}
                            </div>}
                        </div>
                        {!!tempArray?.length && <div className={css.ex__wrap}>
                            {!!tempArray?.length && tempArray.map(ex => <ExBlock testTempId={tempTest.testTempId}
                                                                                 tempId={ex} key={ex}/>)}
                        </div>}
                        <div className={css.test__block_btn}>
                            <div className={css.addEx__btn_wrap}>
                                <div className={css.addEx__btn} onClick={() => addExBlock()}>
                                    {EN ? '+ Add exercise' : '+ Додати завдання'}
                                </div>
                            </div>
                            <div className={css.addEx__btn_wrap}>
                                <button onClick={() => sendNormTest()} className={css.addEx__btn}>
                                    {EN ? 'SEND' : 'НАДІСЛАТИ'}
                                </button>
                            </div>
                        </div>
                    </>
                    :
                    <form className={css.test__form} onSubmit={handleSubmit(sendTest)}>
                        <div className={css.to__code_test}>
                            <Link to={'/create-code-test'} className={rootCss.default__button}>
                                {EN ? 'Or create code test' : 'Або створити практичне завдання'}
                            </Link>
                        </div>
                        <div className={css.test__head}>{EN ? 'Create Quiz' : 'Створити Тест'}</div>
                        <div className={css.input__wrap}>
                            <div className={css.test__header_input}>
                                {EN ? 'Test name'
                                    : 'Назва тесту'}
                            </div>
                            <input
                                type="text"
                                placeholder={EN ? 'Enter the test name' : 'Введіть назву тесту'}
                                {...register('name')}
                                autoComplete="off"
                                autoCorrect="off"
                                className={css.test__input}
                            />
                            {errors.name &&
                                <div className={css.input__error}>
                                    {EN ? 'The name of the test must be no shorter than 3 characters and no longer than 35'
                                        : 'Назва тесту повинна бути не коротшою ніж 3 символи та не довшою, ніж 35'}
                                </div>
                            }
                        </div>
                        <div className={css.input__wrap}>
                            <div className={css.test__header_input}>
                                {EN ? 'Needed category'
                                    : 'Потрібна категорія'}
                            </div>
                            <TechDropdown/>
                            {!isTech &&
                                <div className={css.input__error}>
                                    {EN ? 'Choose technology'
                                        : 'Виберіть технологію'}
                                </div>
                            }
                        </div>
                        <div className={css.input__wrap}>
                            <div className={css.test__header_input}>
                                {EN ? 'Test language'
                                    : 'Мова тесту'}
                            </div>
                            <div onClick={() => setTestLng(!testLng)}
                                 className={`${testLng ? headerCss.switch_btn_en : headerCss.switch_btn_uk} ${css.language__btn}`}>
                                <div className={testLng ? headerCss.switch_btn_ball_en : headerCss.switch_btn_ball_uk}>
                                </div>
                                <div
                                    className={testLng ? headerCss.switch_btn_name_en : headerCss.switch_btn_name_uk}>
                                    {testLng ? 'EN' : 'UK'}
                                </div>
                            </div>
                        </div>
                        <div className={css.input__wrap}>
                            <div className={css.test__header_input}>
                                {EN ? 'Difficult'
                                    : 'Складність'}
                            </div>
                            <input
                                type="number"
                                placeholder={EN ? 'Enter the difficulty of the test' : 'Введіть складність тесту'}
                                {...register('difficult')}
                                min="1" max="10"
                                autoComplete="off"
                                autoCorrect="off"
                                className={css.difficult__input}
                            />
                            {errors.difficult &&
                                <div className={css.difficult__error}>
                                    {EN ? 'Set an integer value between 1 and 10'
                                        : 'Встановіть ціле значення від 1 до 10'}
                                </div>
                            }
                        </div>
                        <div className={css.input__wrap}>
                            <div className={css.test__header_input}>
                                {EN ? 'Min. result'
                                    : 'Мін. результат'}
                            </div>
                            <input
                                type="number"
                                placeholder={EN ? 'Enter the min. result, %' : 'Введіть мін. результат, %'}
                                {...register('correctPercent')}
                                min="10" max="100"
                                autoComplete="off"
                                autoCorrect="off"
                                className={css.difficult__input}
                            />
                            {errors.difficult &&
                                <div className={css.difficult__error}>
                                    {EN ? 'Set an integer value between 10 and 100'
                                        : 'Встановіть ціле значення від 10 до 100'}
                                </div>
                            }
                        </div>
                        <div className={css.input__wrap_private}>
                            <div className={css.input__wrap_private__label}>
                                <label className={css.private__label}>
                                    <div>{EN ? 'Private' : 'Приватний'}</div>
                                    <input
                                        className={css.private__check}
                                        type="checkbox"
                                        {...register('isPrivate')}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className={css.input__wrap_private}>
                            <div className={css.input__wrap_private__label}>
                                <label className={css.private__label}>
                                    <div>{EN ? 'Monetize ' : 'Монетизувати '}</div>
                                    <input
                                        className={css.private__check}
                                        type="checkbox"
                                        {...register('isMonetized')}
                                        onChange={() => setMonetize(!monetize)}
                                    />
                                </label>
                            </div>
                        </div>
                        {monetize && <div className={css.input__wrap}>
                            <div className={css.test__header_input}>
                                {EN ? 'Min. result to get coin'
                                    : 'Мін. результат для отримання монети'}
                            </div>
                            <input
                                type="number"
                                placeholder={EN ? 'Enter the min. result to get coin, %' : 'Введіть мін. результат для отримання монети, %'}
                                {...register('monetizedPercent')}
                                min="50" max="100"
                                autoComplete="off"
                                autoCorrect="off"
                                className={css.difficult__input}
                            />
                            {errors.difficult &&
                                <div className={css.difficult__error}>
                                    {EN ? 'Set an integer value between 50 and 100'
                                        : 'Встановіть ціле значення від 50 до 100'}
                                </div>
                            }
                        </div>

                        }
                        <button className={css.testCreate__btn}>{EN ? 'Continue' : 'Продовжити'}</button>
                    </form>
                }
            </div>
        </div>
    );
};

export {CreateTestPage};
