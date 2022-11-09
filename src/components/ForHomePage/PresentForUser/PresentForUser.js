import React from 'react';
import css from './PresentForUser.module.css';
import {useSelector} from 'react-redux';

const PresentForUser = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const setLocalStorage = () => {
        localStorage.setItem('present', 'true');
        window.location.reload();
    };

    return (
        <div className={css.present__wrap}>
            <div className={css.present__block}>
                <div className={css.cross} onClick={() => setLocalStorage()}></div>

                <div className={css.present__title}>
                    {EN ? 'Сool opportunity' : 'Крута можливість'}
                </div>

                <p className={css.fontSize36}>
                    {EN ? <div>Skilliant pays <span className={css.span}>$100</span> for the first <br/>
                            <span className={css.span}>10</span> users on the leaderboard</div>
                        :
                        <div>Skilliant платить <span className={css.span}>$100</span> для перших <br/>
                            <span className={css.span}>10</span> користувачів у таблиці лідерів</div>}
                </p>

                <p className={css.fontSize30}>
                    {EN ? <div>Don't miss your chance to test <br/> your IT skills and earn some $$$</div>
                        :
                        <div>Не прогав свій шанс протестувати <br/> IT навички та заробити декілька $$$</div>}
                </p>
            </div>
        </div>
    );
};

export {PresentForUser};

