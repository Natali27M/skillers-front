import React, {useEffect, useState} from 'react';
import css from './ExBlock.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {createVariant, deleteExerciseFromArray, pushExercise} from '../../../store';
import {useForm} from 'react-hook-form';
import {VarBlock} from '../VarBlock/VarBlock';

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
        if(tempVariantArray.length) {
            const myArray = tempVariantArray.filter(variant => variant.exTempId === tempId)
            setMyVariants(myArray)
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
                <p className={css.ex__description}>
                    {exercise.description}
                </p> :
                <form className={css.create__ex_form} onSubmit={handleSubmit(saveExercise)}>
                    <textarea
                        placeholder={EN ? 'Enter the task' : 'Введіть умову завдання'}
                        {...register('description')}
                        autoComplete="off"
                        autoCorrect="off"
                        className={css.create__ex_input}
                    />
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

            {exercise &&
                <button onClick={() => addVariant()} className={css.add__var_btn}>
                    {EN ? '+Add variant' : '+Додати варіант'}
                </button>
            }
            <div className={css.del__ex_btn_wrap}>
                <button className={css.del__ex_btn} onClick={() => dispatch(deleteExerciseFromArray(tempId))}>
                    {EN ? 'Delete exercise' : 'Видалити завдання'}
                </button>
            </div>
        </div>
    );
};

export {ExBlock};