import React, {useEffect, useState} from 'react';

import testCss from '../CreateTestPage/CreateTestPage.module.css';
import {useForm} from 'react-hook-form';
import {TechDropdown} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import compilerParamsSetter from '../../RootFunctions/compilerParamsSetter';
import {joiResolver} from '@hookform/resolvers/joi/dist/joi';
import {CodeTestValidator} from '../../validation';
import {clearOneCodeTest, createCodeTest} from '../../store';
import {Navigate} from 'react-router-dom';
import headerCss from '../../components/GeneralComponents/Header/Header.module.css';
import css from '../CreateTestPage/CreateTestPage.module.css';


const CreateCodeTestPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {technology} = useSelector(state => state['createTestsReducers']);

    const {oneCodeTest} = useSelector(state => state['codeTestReducers']);

    const {user} = useSelector(state => state['userReducers']);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearOneCodeTest());
    }, []);

    const {
        register, handleSubmit, formState: {errors}, reset
    } = useForm({resolver: joiResolver(CodeTestValidator)});

    const [isTech, setIsTech] = useState(true);

    const [isTime, setIsTime] = useState(true);

    const [isCreation, setIsCreation] = useState(false);

    const [testLng, setTestLng] = useState(true);

    const createTest = (obj) => {
        const timeSeconds = +obj.hours * 3600 + +obj.minutes * 60 + +obj.seconds;

        delete obj.seconds;
        delete obj.hours;
        delete obj.minutes;


        const {languageId, editorLang} = compilerParamsSetter(technology?.id);
        if (technology && timeSeconds > 0) {
            dispatch(createCodeTest({
                ...obj,
                ukrLng: !testLng,
                timeSeconds,
                techId: technology?.id,
                languageId,
                editorLang,
                authorId: user?.id
            }));
            reset();
            setIsTech(true);
            setIsTime(true);
            setIsCreation(true);

        }
        if (!technology) {
            setIsTech(false);
        }
        if (timeSeconds <= 0) {
            setIsTime(false);
        }
    };

    if (!user) {
        return <Navigate to={'/login'} replace/>;
    }

    if (oneCodeTest && isCreation) {
        return <Navigate to={`/code-test/${oneCodeTest?.id}`} replace/>;
    }

    return (
        <div className={testCss.createTest__page}>
            <div className={testCss.createTest__bg}></div>
            <div className={testCss.createTest__wrap}>
                <form className={testCss.test__form} onSubmit={handleSubmit(createTest)}>
                    <div className={testCss.test__head}>{EN ? 'Create code test' : 'Створити практичний тест'}</div>
                    <div className={testCss.input__wrap}>
                        <div className={testCss.test__header_input}>
                            {EN ? 'Test name' : 'Назва тесту'}
                        </div>
                        <input
                            type="text"
                            placeholder={EN ? 'Enter the test name' : 'Введіть назву тесту'}
                            {...register('testName')}
                            autoComplete="off"
                            autoCorrect="off"
                            className={testCss.test__input}
                        />
                        {errors.testName && <div className={testCss.input__error}>
                            {EN ? 'The name of the test must be no shorter than 3 characters and no longer than 35' : 'Назва тесту повинна бути не коротшою ніж 3 символи та не довшою, ніж 35'}
                        </div>}
                    </div>
                    <div className={testCss.input__wrap}>
                        <div className={testCss.test__header_input}>
                            {EN ? 'Needed category' : 'Потрібна категорія'}
                        </div>
                        <TechDropdown codeTest={true}/>
                        {!isTech && <div className={testCss.input__error}>
                            {EN ? 'Choose technology' : 'Виберіть технологію'}
                        </div>}
                    </div>
                    <div className={testCss.input__wrap}>
                        <div className={css.test__header_input}>
                            {EN ? 'Test language'
                                : 'Мова тесту'}
                        </div>
                        <div onClick={() => setTestLng(!testLng)}
                             className={`${testLng ? headerCss.switch_btn_en : headerCss.switch_btn_uk} ${testCss.language__btn}`}>
                            <div className={testLng ? headerCss.switch_btn_ball_en : headerCss.switch_btn_ball_uk}>
                            </div>
                            <div
                                className={testLng ? headerCss.switch_btn_name_en : headerCss.switch_btn_name_uk}>
                                {testLng ? 'EN' : 'UK'}
                            </div>
                        </div>
                    </div>
                    <div className={testCss.input__wrap}>
                        <div className={testCss.test__header_input}>
                            {EN ? 'Exercise description' : 'Опис завдання'}
                        </div>
                        <textarea
                            placeholder={EN ? 'Enter the exercise description' : 'Введіть опис завдання'}
                            {...register('description')}
                            autoComplete="off"
                            autoCorrect="off"
                            className={`${testCss.difficult__input} ${testCss.description__textarea}`}
                        />
                        {errors.description && <div className={testCss.difficult__error}>
                            {EN ? 'This is a required field' : 'Це обов\'язкове поле'}
                            {/*{errors.description.message}*/}
                        </div>}
                    </div>
                    <div className={testCss.input__wrap}>
                        <div className={testCss.test__header_input}>
                            {EN ? 'Exercise input' : 'Вхідні дані'}
                        </div>
                        <textarea
                            placeholder={EN ? 'Enter the exercise input' : 'Введіть вхідні дані'}
                            {...register('input')}
                            autoComplete="off"
                            autoCorrect="off"
                            className={`${testCss.difficult__input} ${testCss.description__textarea}`}
                        />
                        {errors.input && <div className={testCss.difficult__error}>
                            {EN ? 'This is a required field' : 'Це обов\'язкове поле'}
                            {/*{errors.input.message}*/}
                        </div>}
                    </div>
                    <div className={testCss.input__wrap}>
                        <div className={testCss.test__header_input}>
                            {EN ? 'Expected result' : 'Очікуваний результат'}
                        </div>
                        <textarea
                            placeholder={EN ? 'Enter the expected result' : 'Введіть очікуваний результат'}
                            {...register('outputResult')}
                            autoComplete="off"
                            autoCorrect="off"
                            className={`${testCss.difficult__input} ${testCss.description__textarea}`}
                        />
                        {errors.outputResult && <div className={testCss.difficult__error}>
                            {EN ? 'This is a required field' : 'Це обов\'язкове поле'}
                        </div>}
                    </div>
                    <div className={testCss.input__wrap}>
                        <div className={testCss.test__header_input}>
                            {EN ? 'Initial code' : 'Початковий код'}
                        </div>
                        <textarea
                            placeholder={EN ? 'Enter the initial code' : 'Введіть початковий код'}
                            {...register('codeFragment')}
                            autoComplete="off"
                            autoCorrect="off"
                            className={`${testCss.difficult__input} ${testCss.description__textarea}`}
                        />
                        {errors.codeFragment && <div className={testCss.difficult__error}>
                            {EN ? 'This is a required field' : 'Це обов\'язкове поле'}
                        </div>}
                    </div>
                    <div className={testCss.input__wrap}>
                        <div className={testCss.test__header_input}>
                            {EN ? 'Difficult' : 'Складність'}
                        </div>
                        <input
                            type="number"
                            placeholder={EN ? 'Enter the difficulty of the test' : 'Введіть складність тесту'}
                            {...register('difficult')}
                            min="1" max="10"
                            autoComplete="off"
                            autoCorrect="off"
                            className={testCss.difficult__input}
                        />
                        {errors.difficult && <div className={testCss.difficult__error}>
                            {EN ? 'Set an integer value between 1 and 10' : 'Встановіть ціле значення від 1 до 10'}
                        </div>}
                    </div>
                    <div className={testCss.input__wrap}>
                        <div className={testCss.test__header_input}>
                            {EN ? 'Time to complete' : 'Час на виконання'}
                        </div>
                        <div className={testCss.time__inputs__wrap}>
                            <input
                                type="number"
                                placeholder={EN ? 'Hours' : 'Години'}
                                {...register('hours')}
                                min="0" max="20"
                                autoComplete="off"
                                autoCorrect="off"
                                className={testCss.time__input}
                            />
                            <input
                                type="number"
                                placeholder={EN ? 'Minutes' : 'Хвилини'}
                                {...register('minutes')}
                                min="0" max="60"
                                autoComplete="off"
                                autoCorrect="off"
                                className={testCss.time__input}
                            />
                            <input
                                type="number"
                                placeholder={EN ? 'Seconds' : 'Секунди'}
                                {...register('seconds')}
                                min="0" max="60"
                                autoComplete="off"
                                autoCorrect="off"
                                className={testCss.time__input}
                            />
                        </div>
                        {!isTime && <div className={testCss.difficult__error}>
                            {EN ? 'Set time' : 'Встановіть час'}
                        </div>}
                    </div>
                    <div className={testCss.input__wrap_private}>
                        <div className={testCss.input__wrap_private__label}>
                            <label className={testCss.private__label}>
                                <div>{EN ? 'Private' : 'Приватний'}</div>
                                <input
                                    className={testCss.private__check}
                                    type="checkbox"
                                    {...register('isPrivate')}
                                />
                            </label>
                        </div>
                    </div>
                    <button className={testCss.testCreate__btn}>{EN ? 'Send' : 'Надіслати'}</button>
                </form>
            </div>
        </div>
    );
};

export {CreateCodeTestPage};