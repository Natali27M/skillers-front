import React, {useState} from 'react';

import css from './CreateCodeTestPage.module.css';
import testCss from '../CreateTestPage/CreateTestPage.module.css';
import {useForm} from 'react-hook-form';
import {TechDropdown} from '../../components';
import {useSelector} from 'react-redux';


const CreateCodeTestPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {technology} = useSelector(state => state['createTestsReducers']);

    const {
        register, handleSubmit, formState: {errors}, reset
    } = useForm();

    const [monetize, setMonetize] = useState(false);

    const [isTech, setIsTech] = useState(true);

    const createTest = (obj) => {
        console.log({...obj, techId: technology?.id});
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
                    <TechDropdown/>
                    {!isTech && <div className={testCss.input__error}>
                        {EN ? 'Choose technology' : 'Виберіть технологію'}
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
                        {testCss ? 'Set an integer value between 1 and 10' : 'Встановіть ціле значення від 1 до 10'}
                    </div>}
                </div>
                <div className={testCss.input__wrap}>
                    <div className={testCss.test__header_input}>
                        {EN ? 'Min. result' : 'Мін. результат'}
                    </div>
                    <input
                        type="number"
                        placeholder={EN ? 'Enter the min. result, %' : 'Введіть мін. результат, %'}
                        {...register('correctPercent')}
                        min="10" max="100"
                        autoComplete="off"
                        autoCorrect="off"
                        className={testCss.difficult__input}
                    />
                    {errors.difficult && <div className={testCss.difficult__error}>
                        {EN ? 'Set an integer value between 10 and 100' : 'Встановіть ціле значення від 10 до 100'}
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
                    {errors.difficult && <div className={testCss.difficult__error}>
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
                <div className={testCss.input__wrap_private}>
                    <div className={testCss.input__wrap_private__label}>
                        <label className={testCss.private__label}>
                            <div>{EN ? 'Monetize ' : 'Монетизувати '}</div>
                            <input
                                className={testCss.private__check}
                                type="checkbox"
                                {...register('isMonetized')}
                                onChange={() => setMonetize(!monetize)}
                            />
                        </label>
                    </div>
                </div>
                {monetize && <div className={testCss.input__wrap}>
                    <div className={testCss.test__header_input}>
                        {EN ? 'Min. result to get coin' : 'Мін. результат для отримання монети'}
                    </div>
                    <input
                        type="number"
                        placeholder={EN ? 'Enter the min. result to get coin, %' : 'Введіть мін. результат для отримання монети, %'}
                        {...register('monetizedPercent')}
                        min="50" max="100"
                        autoComplete="off"
                        autoCorrect="off"
                        className={testCss.difficult__input}
                    />
                    {errors.difficult && <div className={testCss.difficult__error}>
                        {EN ? 'Set an integer value between 50 and 100' : 'Встановіть ціле значення від 50 до 100'}
                    </div>}
                </div>

                }
                <button className={testCss.testCreate__btn}>{EN ? 'Continue' : 'Продовжити'}</button>
            </form>
        </div>
    </div>);
};

export {CreateCodeTestPage};