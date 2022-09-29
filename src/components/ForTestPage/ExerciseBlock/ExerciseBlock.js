import React, {useEffect, useState} from 'react';
import css from './ExerciseBlock.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {pushResults} from '../../../store';

const ExerciseBlock = (exercise, exNumber) => {
    const {timeToPush, checked} = useSelector(state => state['exercisesReducers']);
    const {userByTestResult, isTestCompleted} = useSelector(state => state['resultReducers']);

    const dispatch = useDispatch();

    const currentExercise = exercise.exercise.attributes;

    const currentVariants = currentExercise?.variants?.data;


    const [cVariant, setCVariant] = useState({});

    useEffect(() => {
        if (timeToPush && cVariant !== {}) {
            dispatch(pushResults(cVariant));
        }
    }, [timeToPush]);



    return (
        <div className={css.exercise__block}>
            <div className={css.exercise__description}>
                {exercise.exNumber}.    {currentExercise?.description}
            </div>
            <div className={css.variants__wrap}>
                {
                    currentVariants?.map(variant =>
                        <div onClick={() =>  !checked && !isTestCompleted && setCVariant(variant)}
                             key={variant.id}
                             className={checked || isTestCompleted ? (variant.attributes.correct ? (cVariant === variant ? css.correct__chosen_answer : css.correct__answer) : (cVariant === variant ? css.incorrect__chosen_answer : css.simple__variant)) : cVariant === variant ? css.chosen__variant : css.simple__variant}>
                            <div className={css.check__arrow_block}>{(cVariant === variant) && '✓'}</div>
                            <p className={css.variant__text}>{variant.attributes.text}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export {ExerciseBlock};