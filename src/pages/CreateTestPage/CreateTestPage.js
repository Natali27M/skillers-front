import React, {useEffect, useState} from 'react';
import css from './CreateTestPage.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi/dist/joi';
import {TestNameValidator} from '../../validation';
import {ExBlock, TechDropdown} from '../../components';
import {
    clearCreateTest,
    createExercise,
    createTempTest,
    createTest, createTimeToClear,
    deleteVariantFromArray,
    pushExercise,
    sendExercise,
    sendVariant
} from '../../store';
import {Navigate} from 'react-router-dom';


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
            dispatch(createTempTest({...obj, techId: technology.id, testTempId: `test${Date.now()}`}));
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
                dispatch(sendExercise({data: {testId, description: ex.description, code: ex.code}, tempId: ex.exTempId}));
            });
        }
    }, [testId]);

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
            authorId: user?.id
        }));
        setTimeout(() => {
            if (exercises.length === 0) {
                setIsComplete(true);
            }
            if(variants.length === 0) {
                setIsComplete(true)
            }
        }, 100);

    };

    if (isComplete && testId) {
        return <Navigate to={`/test/${testId}`} replace/>;
    }

    if (!user) {
        return <Navigate to={'/login'} replace/>;
    }


    return (
        <div className={css.createTest__page}>
            <div className={css.createTest__bg}></div>
            <div className={css.createTest__wrap}>
                {tempTest ?
                    <>
                        <div className={css.test__header}>
                            <div className={css.test__name}>{tempTest?.name}</div>
                            <div className={css.test__name}>{technology?.attributes.name}</div>
                            <div
                                className={css.test__difficult}>{EN ? 'Difficult' : 'Складність'} {tempTest?.difficult}
                            </div>
                        </div>
                        {!!tempArray?.length && <div className={css.ex__wrap}>
                            {!!tempArray?.length && tempArray.map(ex => <ExBlock testTempId={tempTest.testTempId}
                                                                                 tempId={ex} key={ex}/>)}
                        </div>}
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
                    </>
                    :
                    <form className={css.test__form} onSubmit={handleSubmit(sendTest)}>
                        <div className={css.input__wrap}>
                            <input
                                type="text"
                                placeholder={EN ? 'Test name' : 'Назва тесту'}
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
                            <TechDropdown/>
                            {!isTech &&
                                <div className={css.input__error}>
                                    {EN ? 'Choose technology'
                                        : 'Виберіть технологію'}
                                </div>
                            }
                        </div>
                        <div className={css.input__wrap}>
                            <input
                                type="number"
                                placeholder={EN ? 'Difficult' : 'Складність'}
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
                        <button className={css.testCreate__btn}>{EN ? 'Continue' : 'Продовжити'}</button>
                    </form>
                }
            </div>
        </div>
    );
};

export {CreateTestPage};