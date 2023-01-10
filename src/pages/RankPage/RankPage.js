import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

import css from './RankPage.module.css';
import rootCSS from '../../styles/root.module.css';
import Lamer from '../../images/rank_big/Lamer.png';
import Trainee from '../../images/rank_big/Trainee.png';
import Junior from '../../images/rank_big/Junior.png';
import Middle from '../../images/rank_big/Middle.png';
import Senior from '../../images/rank_big/Senior.png';
import {Badge} from '../../components/ForUserPage/Badge/Badge';

const RankPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const title = 'SKILLIANT ranks';
    const description = 'Description of ranks by points and conditions for badges';
    const url = 'https://skilliant.net/rank';

    return (
        <div className={css.rank__page}>
            <Helmet>
                <meta charSet="utf-8"/>
                <meta name="description" content={description}/>
                <meta property="og:url" content={url}/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="skilliant.net"/>
                <title>{title}</title>
                <link rel="canonical" href={url}/>
            </Helmet>

            <div className={rootCSS.root__background}></div>
            <div className={css.rank__wrap}>
                <div className={rootCSS.default__title_24}>
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
                            {EN ? 'Linus Torvalds, is that you?' : 'Лінус Торвальдс, це ти?'}
                        </div>
                    </div>
                </div>
                <div className={rootCSS.default__title_24}>
                    {EN ? 'Badges' : 'Нагороди'}
                </div>
                <div className={css.rank__block}>
                    <Badge badge={{techId: 4, count: 5}}/>
                    <div className={css.rank__text}>
                        <div className={css.rank__block_content}>
                            {EN ? 'If you pass 5 tests on one technology' : 'Якщо ви пройдете 5 тестів з однієї технології'}
                        </div>
                        <div className={css.rank__block_content}>
                            {EN ? 'a one-star award will appear on your user page' : 'на вашій сторінці користувача з\'явиться нагорода з однією зіркою'}
                        </div>
                        <div className={css.rank__block_content}>
                            {EN ? 'And as the tests are passed, awards and stars will be added to them' : 'І по мірі проходження тестів нагороди, та зірки на них, будуть додаватись'}
                        </div>
                    </div>
                </div>
                <Link to={'/'} className={rootCSS.default__button}>
                    {EN ? 'To main' : 'На головну'}
                </Link>
            </div>
        </div>
    );
};

export {RankPage};
