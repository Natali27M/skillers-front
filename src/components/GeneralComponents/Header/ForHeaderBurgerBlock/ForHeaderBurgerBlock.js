import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import css from './ForHeaderBurgerBlock.module.css';
import new_icon from '../../../../images/new_icon.svg';
import arrowBlack from '../../../../images/arrowBlack.svg';

const ForHeaderBurgerBlock = ({valueBurger}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {
        open,
        openProducts,
        setOpenProducts,
        openProgramming,
        setOpenProgramming,
        openResources,
        setOpenResources
    } = valueBurger;

    return (
        <div>
        {/*<div className={open ? css.burger__menu_open : css.burger__menu_close}>*/}
            <div className={openProducts ? css.header__link_new_active : css.header__link_new} onClick={() => {
                setOpenProducts(!openProducts)
                setOpenProgramming(false);
                setOpenResources(false);
            }
            }>
                <div className={css.header__link_title}>
                    {EN ? 'Products' : 'Наш продукт'}
                    <img src={arrowBlack} alt="arrow" className={css.arrow}/>
                </div>
            </div>

            {openProducts &&
                <div className={css.link__main}>
                    <div className={css.link__main_wrap}>
                        <div className={css.link__click}>
                            <Link className={css.link__box} to={'/for-users'}>
                                {EN ? 'For users' : 'Користувачам'}
                            </Link>
                            <img src={arrowBlack} alt="arrow" className={css.arrow_mini}/>
                        </div>
                        <div className={css.link__description}>
                            {EN ? 'Here you will find information about various sites,\n' +
                                'YouTube channels, courses that will help you increase your knowledge in IT' :
                                'Тут ви знайдете інформацію про різні сайти,\n' +
                                'YouTube канали, курси, які допоможуть підвищити знання в IT'}
                        </div>
                    </div>

                    <div className={css.link__main_wrap}>
                        <div className={css.link__click}>
                            <Link className={css.link__box} to={'/mentors'}>
                                {EN ? 'Mentors' : 'Ментори'}
                            </Link>
                            <img src={arrowBlack} alt="arrow" className={css.arrow_mini}/>
                        </div>
                        <div className={css.link__description}>
                            {EN ? 'Here you can choose a mentor based on his level of English, knowledge of technology' +
                                ' and commercial experience.'
                                : 'Тут ви можете вибрати наставника, виходячи з його рівня англійської, знання технологій і' +
                                ' комерційного досвіду.'}
                        </div>
                    </div>

                    <div className={css.link__main_wrap}>
                        <div className={css.link__click}>
                            <Link className={css.link__box} to={'/vacancies'}>
                                {EN ? 'Recruting' : 'Рекрутинг'}
                            </Link>
                            <img src={arrowBlack} alt="arrow" className={css.arrow_mini}/>
                        </div>
                        <div className={css.link__description}>
                            {EN ? 'Here you can submit a vacancy and respond to an interesting one for you.'
                                :
                                'Тут ви можете залишити вакансію та відповісти на цікаву для вас.'}
                        </div>
                    </div>

                    <div className={css.link__main_wrap}>
                        <div className={css.link__click}>
                            <Link className={css.link__box} to={'/rank'}>
                                {EN ? 'Rank table' : 'Таблиця рангів'}
                            </Link>
                            <img src={arrowBlack} alt="arrow" className={css.arrow_mini}/>
                        </div>
                        <div className={css.link__description}>
                            {EN ? 'Here you can select the best job candidates.'
                                : 'Тут ви можете обрати найкращих кандидатів на роботу.'}
                        </div>
                    </div>
                </div>
            }

            <div className={openProgramming ? css.header__link_new_active : css.header__link_new} onClick={() => {
                setOpenProgramming(!openProgramming)
                setOpenProducts(false);
                setOpenResources(false);
            }}>
                <div className={css.header__link_title}>
                    <img src={new_icon} alt="new" className={css.new__icon}/>
                    {EN ? 'Programming' : 'Програмування'}
                    <img src={arrowBlack} alt="arrow" className={css.arrow}/>
                </div>
            </div>
            {openProgramming &&
                <div className={css.link__main}>
                    <div className={css.link__main_wrap}>
                        <div className={css.link__click}>
                            <Link className={css.link__box} to={'/compiler'}>
                                {EN ? 'Compiler' : 'Компілятор'}
                            </Link>
                            <img src={arrowBlack} alt="arrow" className={css.arrow_mini}/>
                        </div>
                        <div className={css.link__description}>
                            {EN ? 'Here you can convert (compile) source code written in a particular programming' +
                                ' language to semantically equivalent code in another programming language.'
                                :
                                'Тут ви можете перетворити (компілювати) вихідний код, написаний певною мовою програмування,' +
                                ' у семантично еквівалентний код іншою мовою програмування.'}
                        </div>
                    </div>

                    <div className={css.link__main_wrap}>
                        <div className={css.link__click}>
                            <Link className={css.link__box} to={'/createTest'}>
                                {EN ? 'Create quiz' : 'Створити тест'}
                            </Link>
                            <img src={arrowBlack} alt="arrow" className={css.arrow_mini}/>
                        </div>
                        <div className={css.link__description}>
                            {EN ? 'Here you can share your knowledge by creating a test that all users can see and take.'
                                :
                                'Тут ви можете поділитися своїми знаннями, створивши тест, який зможуть побачити та пройти' +
                                ' всі користувачі.'}
                        </div>
                    </div>

                    <div className={css.link__main_wrap}>
                        <Link className={css.link__box} to={'/team-coding'}>
                            <div className={css.link__position}>
                                <div className={css.link__click}>
                                    {EN ? 'Collaborative programming' : 'Спільне програмування'}
                                    <img src={arrowBlack} alt="arrow" className={css.arrow_mini}/>
                                </div>
                                <img src={new_icon} alt="new" className={css.new__icon_mini}/>
                            </div>
                        </Link>
                        <div className={css.link__description}>
                            {EN ? 'Here you can write code in real time in a team while being far from each other.'
                                :
                                'Тут ви можете писати код в реальному часі в команді, перебуваючи далеко один від одного.'}
                        </div>
                    </div>
                </div>
            }

            <div className={openResources ? css.header__link_new_active : css.header__link_new} onClick={() => {
                setOpenResources(!openResources)
                setOpenProducts(false);
                setOpenProgramming(false);
            }}>
                <div className={css.header__link_title}>
                    <img src={new_icon} alt="new" className={css.new__icon}/>
                    {EN ? 'Resources' : 'Ресурси'}
                    <img src={arrowBlack} alt="arrow" className={css.arrow}/>
                </div>

            </div>
            {openResources &&
                <div className={css.link__main}>
                    <div className={css.link__main_wrap}>
                        <Link className={css.link__box} to={'/learning-plan'}>
                            <div className={css.link__position}>
                                <div className={css.link__click}>
                                    {EN ? 'Learning plans' : 'Навчальні плани'}
                                    <img src={arrowBlack} alt="arrow" className={css.arrow_mini}/>
                                </div>
                                <img src={new_icon} alt="new" className={css.new__icon_mini}/>
                            </div>
                        </Link>
                        <div className={css.link__description}>
                            {EN ? 'Here you can get advice on learning this or that technology.'
                                :
                                'Тут можна отримати консультацію щодо вивчення тієї чи іншої технології.'}
                        </div>
                    </div>

                    <div className={css.link__main_wrap}>
                        <div className={css.link__click}>
                            <Link className={css.link__box} to={'/community'}>
                                {EN ? 'Skilliant Community' : 'Skilliant Спільнота'}
                            </Link>
                            <img src={arrowBlack} alt="arrow" className={css.arrow_mini}/>
                        </div>
                        <div className={css.link__description}>
                            {EN ? 'It\'s a platform where you can share your achievements, ask questions and get' +
                                ' answers, and share your ideas.'
                                :
                                'Це платформа, де ви можете ділитися своїми досягненнями, ставити запитання й отримувати' +
                                ' відповіді, а також ділитися своїми ідеями.'}
                        </div>
                    </div>
                </div>
            }

        </div>);
};

export {ForHeaderBurgerBlock};
