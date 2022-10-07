import React from 'react';

import css from './RankPage.module.css';
import Lamer from '../../images/rank_big/Lamer.png';
import Trainee from '../../images/rank_big/Trainee.png';
import Junior from '../../images/rank_big/Junior.png';
import Middle from '../../images/rank_big/Middle.png';
import Senior from '../../images/rank_big/Senior.png';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';


const RankPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    return (
        <div className={css.rank__page}>
            <div className={css.rank__wrap}>
                <div className={css.rank__title}>
                    {EN ? 'SKILLIANT ranks' : 'Звання SKILLIANT'}
                </div>
                <div className={css.rank__block}>
                    <img src={Lamer} alt="lamer" className={css.rank__img}/>
                    <div className={css.rank__text}>
                        <div className={css.rank__block_title}>
                            Lamer
                        </div>
                        <div className={css.rank__block_content}>
                            {EN ? 'User rating from 0 to 20' : 'Рейтинг користувача від 0 до 20'}
                        </div>
                        <div className={css.rank__block_content}>
                            {EN ? 'Don\'t worry, all seniors were once lamers' : 'Не хвилюйся, всі сеньйори колись були ламерами'}
                        </div>
                    </div>
                </div>
                <div className={css.rank__block}>
                    <img src={Trainee} alt="Trainee" className={css.rank__img}/>
                    <div className={css.rank__text}>
                        <div className={css.rank__block_title}>
                            Trainee
                        </div>
                        <div className={css.rank__block_content}>
                            {EN ? 'User rating from 20 to 50' : 'Рейтинг користувача від 20 до 50'}
                        </div>
                        <div className={css.rank__block_content}>
                            {EN ? 'Not bad, but you can do better' : 'Вже непогано, але ти можеш краще'}
                        </div>
                    </div>
                </div>
                <div className={css.rank__block}>
                    <img src={Junior} alt="Junior" className={css.rank__img}/>
                    <div className={css.rank__text}>
                        <div className={css.rank__block_title}>
                            Junior
                        </div>
                        <div className={css.rank__block_content}>
                            {EN ? 'User rating from 50 to 100' : 'Рейтинг користувача від 50 до 100'}
                        </div>
                        <div className={css.rank__block_content}>
                            {EN ? 'Well done, I\'m proud of you' : 'Молодець, я пишаюся тобою'}
                        </div>
                    </div>
                </div>
                <div className={css.rank__block}>
                    <img src={Middle} alt="Middle" className={css.rank__img}/>
                    <div className={css.rank__text}>
                        <div className={css.rank__block_title}>
                            Middle
                        </div>
                        <div className={css.rank__block_content}>
                            {EN ? 'User rating from 100 to 200' : 'Рейтинг користувача від 100 до 200'}
                        </div>
                        <div className={css.rank__block_content}>
                            {EN ? 'Wow, you are really cool' : 'Вау, ти реально крутий'}
                        </div>
                    </div>
                </div>
                <div className={css.rank__block}>
                    <img src={Senior} alt="Senior" className={css.rank__img}/>
                    <div className={css.rank__text}>
                        <div className={css.rank__block_title}>
                            Senior
                        </div>
                        <div className={css.rank__block_content}>
                            {EN ? 'User rating from 200 and above' : 'Рейтинг користувача від 200 і вище'}
                        </div>
                        <div className={css.rank__block_content}>
                            {EN ? 'Bill Gates, is that you?' : 'Білл Гейтс, це ти?'}
                        </div>
                    </div>
                </div>
                <Link to={'/'}>
                    <button className={css.to__main_link}>
                        {EN ? 'To main' : 'На головну'}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export {RankPage};