import React, {useEffect, useState} from 'react';

import testCss from '../CreateTestPage/CreateTestPage.module.css';
import {useForm} from 'react-hook-form';
import {TechDropdown} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import compilerParamsSetter from '../../RootFunctions/compilerParamsSetter';
import {joiResolver} from '@hookform/resolvers/joi/dist/joi';
import {CodeTestValidator} from '../../validation';
import {createCodeTest} from '../../store';


const CreateCodeTestPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {technology} = useSelector(state => state['createTestsReducers']);

    const {oneCodeTest} = useSelector(state => state['codeTestReducers']);

    const {
        register, handleSubmit, formState: {errors}, reset
    } = useForm({resolver: joiResolver(CodeTestValidator)});

    const [isTech, setIsTech] = useState(true);

    useEffect(() => {
        console.log(oneCodeTest);
    }, [oneCodeTest]);

    const dispatch = useDispatch();

    const createTest = (obj) => {
        const {languageId, editorLang} = compilerParamsSetter(technology?.id);
        console.log({...obj, techId: technology?.id, languageId, editorLang});
        dispatch(createCodeTest({...obj, techId: technology?.id, languageId, editorLang}));
        reset();
    };

    return (<div className={testCss.createTest__page}>
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
                        {...register('name')}
                        autoComplete="off"
                        autoCorrect="off"
                        className={testCss.test__input}
                    />
                    {errors.name && <div className={testCss.input__error}>
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
                        {EN ? 'Seconds to complete' : 'Секунди на виконання'}
                    </div>
                    <input
                        type="number"
                        placeholder={EN ? 'Enter seconds to complete' : 'Введіть секунди на виконання'}
                        {...register('timeSeconds')}
                        min="1" max="100000"
                        autoComplete="off"
                        autoCorrect="off"
                        className={testCss.difficult__input}
                    />
                    {errors.timeSeconds && <div className={testCss.difficult__error}>
                        {EN ? 'Set an integer value between 1 and 100000' : 'Встановіть ціле значення від 1 до 100000'}
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
    </div>);
};

export {CreateCodeTestPage};