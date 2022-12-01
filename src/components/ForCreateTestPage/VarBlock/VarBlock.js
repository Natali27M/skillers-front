import React, {useState} from 'react';
import css from '../ExBlock/ExBlock.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {deleteVariantFromArray, pushVariant} from '../../../store';

const VarBlock = ({exTempId, varTempId}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const dispatch = useDispatch();

    const {
        register, handleSubmit
    } = useForm();

    const [variant, setVariant] = useState(null);

    const saveVariant = (obj) => {
        dispatch(pushVariant({...obj, exTempId, varTempId}));
        setVariant({...obj, exTempId, varTempId});
    };

    const delVariant = () => {
        dispatch(deleteVariantFromArray(varTempId));
        setVariant(null);
    };

    return (
        <div>
            {variant ?
                <div className={css.complete__variant}>
                    <div className={css.variant__left}>
                        <div className={css.variant__name}>
                            {variant.text}
                        </div>
                        <div className={variant.correct ?
                            css.variant__correct : css.variant__incorrect}
                        >
                            {variant.correct ? (EN ? 'Correct' : 'Правильне') : (EN ? 'Incorrect' : 'Не правильне')}
                        </div>
                    </div>
                    <button className={css.del__var_btn} onClick={() => delVariant()}>
                        {EN ? 'Delete' : 'Видалити'}
                    </button>
                </div>
                :
                <form className={css.variant__form} onSubmit={handleSubmit(saveVariant)}>
                    <input
                        type="text"
                        placeholder={EN ? 'Enter the answer' : 'Введіть варіант відповіді'}
                        autoComplete="off"
                        {...register('text')}
                        autoCorrect="off"
                        defaultValue=''
                        className={css.var__input}
                    />
                        <div className={css.is__correct}>
                            {EN ? 'Correct: ' : 'Правильна: '}
                        </div>
                        <input
                            type="checkbox"
                            {...register('correct')}
                            className={css.var__checkbox}
                        />
                    <button className={css.save__var_btn}>
                        {EN ? 'Save' : 'Зберегти'}
                    </button>
                </form>}
        </div>
    );
};

export {VarBlock};
