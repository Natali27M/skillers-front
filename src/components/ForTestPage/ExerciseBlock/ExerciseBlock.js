import React, {useEffect, useState} from 'react';
import css from './ExerciseBlock.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {pushResults} from '../../../store';
import {CodeSnippet} from '../../GeneralComponents';


const ExerciseBlock = (exercise) => {
    const {timeToPush, checked, result, variants, resultVariants} = useSelector(state => state['exercisesReducers']);
    const {userByTestResult, isTestCompleted} = useSelector(state => state['resultReducers']);

    const dispatch = useDispatch();

    const currentExercise = exercise.exercise.attributes;

    let currentVariants = currentExercise?.variants?.data;


    const [cVariant, setCVariant] = useState({});

    useEffect(() => {
        if (result) {
            for (const targetVariant of currentVariants) {
                const chosen = variants.find(element => element.id === targetVariant.id);

                if (chosen) {
                    setCVariant(targetVariant);
                }
            }
        }
    }, [result]);

    useEffect(() => {
        if (timeToPush && cVariant !== {}) {
            dispatch(pushResults(cVariant));
        }
    }, [timeToPush]);


    const findVariants = [];

    for (let variant of currentVariants) {
        const targetVariant = resultVariants?.find(element => element.id === variant.id);
        if (targetVariant) {
            variant = targetVariant;
        }
        findVariants.push(variant);
    }


    const findVariant = (variant) => {
        const targetVariant = resultVariants?.find(element => element.id === variant.id);
        return !!targetVariant;
    };

    return (
        <div className={css.exercise__block}>
            <div className={css.exercise__description}>
                {exercise.exNumber}. {currentExercise?.description}
            </div>
            {currentExercise?.code &&
                <div className={css.code__snippet}>
                    <CodeSnippet data={currentExercise?.code}/>
                </div>
            }

            <div className={css.variants__wrap}>
                {
                    (!!findVariants.length ? findVariants : currentVariants)?.map(variant =>
                        <div onClick={() => !checked && !isTestCompleted && setCVariant(variant)}
                             key={variant.id}
                             className={
                                 (checked && result) || isTestCompleted
                                     ?
                                     (variant.attributes.correct ?
                                             (cVariant === variant ?
                                                     css.correct__chosen_answer
                                                     :
                                                     css.correct__answer
                                             )
                                             :
                                             (variant.attributes.correct === false ? css.incorrect__chosen_answer : (cVariant === variant
                                                     ?
                                                     css.incorrect__chosen_answer
                                                     :
                                                     css.simple__variant
                                             ))
                                     )
                                     :
                                     cVariant === variant
                                         ?
                                         css.chosen__variant
                                         :
                                         css.simple__variant
                             }>
                            <div
                                className={css.check__arrow_block}>{(cVariant === variant || findVariant(variant)) && '✓'}</div>
                            <p className={css.variant__text}>{variant.attributes.text}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export {ExerciseBlock};
