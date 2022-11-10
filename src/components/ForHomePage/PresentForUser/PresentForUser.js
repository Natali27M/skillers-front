import React from 'react';
import {useSelector} from 'react-redux';

import css from './PresentForUser.module.css';

const PresentForUser = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const setLocalStorage = () => {
        localStorage.setItem('present', 'true');
        window.location.reload();
    };

    return (
        <div className={css.present__wrap}>
            <div className={css.present__block}>

                <div className={css.present__block_cross} onClick={() => setLocalStorage()}></div>

                <div className={css.present__title}>
                    {EN ? 'Сool opportunity' : 'Крута можливість'}
                </div>

                <div className={css.fontSize36}>
                    {EN ? <p>Skilliant pays <span className={css.present__block_underline}>$100</span> for the first <br/>
                            <span className={css.present__block_underline}>10</span> users on the leaderboard</p>
                        :
                        <p>Skilliant платить <span className={css.present__block_underline}>$100</span> для перших <br/>
                            <span className={css.present__block_underline}>10</span> користувачів у таблиці лідерів</p>}
                </div>

                <div className={css.fontSize30}>
                    {EN ? <p>Don't miss your chance to test <br/> your IT skills and earn some $$$</p>
                        :
                        <p>Не прогав свій шанс протестувати <br/> IT навички та заробити декілька $$$</p>}
                </div>

            </div>
        </div>
    );
};

export {PresentForUser};

