import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import css from './ExBlock.module.css';
import {createVariant, deleteExerciseFromArray, pushExercise} from '../../../store';
import {useForm} from 'react-hook-form';
import {VarBlock} from '../VarBlock/VarBlock';
import {CodeSnippet} from '../../GeneralComponents';

const ExBlock = ({tempId, testTempId}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {
        testId,
        tempVariantArray
    } = useSelector(state => state['createTestsReducers']);

    const dispatch = useDispatch();

    const {
        register, handleSubmit, formState: {errors}
    } = useForm();

    const [myVariants, setMyVariants] = useState([]);

    useEffect(() => {
        if (tempVariantArray.length) {
            const myArray = tempVariantArray.filter(variant => variant.exTempId === tempId);
            setMyVariants(myArray);
        }
    }, [tempVariantArray]);

    const [exercise, setExercise] = useState(null);

    const saveExercise = (obj) => {
        dispatch(pushExercise({...obj, testTempId, exTempId: tempId}));
        setExercise({...obj, testTempId, exTempId: tempId});
    };

    const addVariant = () => {
        dispatch(createVariant({exTempId: tempId}));
    };


    return (
        <div className={css.exBlock}>
            {exercise ?
                <div className={css.ex__data_wrap}>
                    <p className={css.ex__description}>
                        {exercise?.description}
                    </p>
                    {exercise?.code &&
                        <div className={css.code__snippet}>
                            <CodeSnippet data={exercise?.code}/>
                        </div>
                    }
                </div>
                :
                <form className={css.create__ex_form} onSubmit={handleSubmit(saveExercise)}>
                    <div className={css.textarea__wrap}>
                        <div className={css.test__header_textarea}>
                            {EN ? 'Task'
                                : 'Завдання'}
                        </div>
                        <textarea
                            placeholder={EN ? 'Enter the task' : 'Введіть умову завдання'}
                            {...register('description')}
                            autoComplete="off"
                            autoCorrect="off"
                            className={css.create__ex_input}
                        />
                        <div className={css.test__header_textarea}>
                            {EN ? 'Code'
                                : 'Код'}
                        </div>
                        <textarea
                            placeholder={EN ? 'Enter the code (optionally)' : 'Введіть код для завдання (за потреби)'}
                            {...register('code')}
                            autoComplete="off"
                            autoCorrect="off"
                            className={css.create__ex_input}
                        />
                    </div>
                    <button className={css.create__ex_btn}>
                        {exercise ? (EN ? 'Save' : 'Зберегти') : (EN ? 'Continue' : 'Продовжити')}
                    </button>
                </form>
            }
            <div className={css.variants__wrap}>
                {!!myVariants?.length && myVariants?.map(variant =>
                    <VarBlock exTempId={tempId} key={variant.varTempId} varTempId={variant.varTempId}/>
                )}
            </div>
            <div className={css.variants__block_button}>
                {exercise &&
                    <div className={css.add__var_button}>
                        <button onClick={() => addVariant()} className={css.add__var_btn}>
                            {EN ? '+Add variant' : '+Додати варіант'}
                        </button>
                    </div>
                }
                {/*<div className={css.del__ex_btn_wrap}>*/}
                <div className={css.add__var_button}>
                    <button className={css.del__ex_btn} onClick={() => dispatch(deleteExerciseFromArray(tempId))}>
                        {EN ? 'Delete exercise' : 'Видалити завдання'}
                    </button>
                </div>

                {/*</div>*/}
            </div>

        </div>
    );
};

export {ExBlock};
