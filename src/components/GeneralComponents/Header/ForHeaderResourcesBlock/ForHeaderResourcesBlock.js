import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import css from '../ForHeaderProductsBlock/ForHeaderProductsBlock.module.css'
import new_icon from '../../../../images/new_icon.svg';

const ForHeaderResourcesBlock = ({valueBurger}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {
        setOpenProducts,
        setOpenProgramming,
        openResources,
        setOpenResources,
    } = valueBurger;

    return (
        <div>
            <div className={openResources ? css.header__link_new_active : css.header__link_new} onClick={() => {
                setOpenProducts(false);
                setOpenProgramming(false);
                setOpenResources(!openResources);
            }}>
                {EN ? 'Resources' : 'Ресурси'}
                {!openResources &&
                    <img src={new_icon} alt="new" className={css.new__icon}/>
                }
            </div>
            {openResources &&
                <div className={css.link__main}>
                    <div className={css.link__box}>
                        <Link className={css.link__box__mini} to={'/learning-plan'}>
                            <div className={css.link__title_new}>{EN ? 'Learning plans' : 'Навчальні плани'}</div>
                            <img src={new_icon} alt="new" className={css.new__icon_middle}/>
                        </Link>
                        <p className={css.link__box_p}>
                            {EN ? 'Here you can get advice on learning this or that technology.'
                                :
                                'Тут можна отримати консультацію щодо вивчення тієї чи іншої технології.'}
                        </p>
                    </div>

                    <div className={css.link__box}>
                        <Link className={css.link__box__mini} to={'/community'}>
                            <div className={css.link__title_new}>{EN ? 'Skilliant Community' : 'Skilliant Спільнота'}</div>
                            <img src={new_icon} alt="new" className={css.new__icon_middle}/>
                        </Link>
                        <p className={css.link__box_p}>
                            {EN ? 'It\'s a platform where you can share your achievements, ask questions and get' +
                                ' answers, and share your ideas.'
                                :
                                'Це платформа, де ви можете ділитися своїми досягненнями, ставити запитання й отримувати' +
                                ' відповіді, а також ділитися своїми ідеями.'}
                        </p>
                    </div>
                </div>
            }
        </div>
    );
};

export {ForHeaderResourcesBlock};
