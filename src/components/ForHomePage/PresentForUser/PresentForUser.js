import React, {useEffect} from 'react';
import css from './PresentForUser.module.css';
import {useSelector} from 'react-redux';

const PresentForUser = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const setLocalStorage = () => {
        localStorage.setItem('present', 'true');
        window.location.reload();
    }

    return (
        <div className={css.present__wrap}>
            <div className={css.present__block}>

                <div className={css.crossBox}>
                    <div className={css.cross} onClick={() => setLocalStorage()}></div>
                </div>

                <div className={css.present__text}>
                    <h2>
                        {EN ? 'Сool opportunity' : 'Крута можливість'}
                    </h2>

                    <p className={css.fontSize36}>
                        {EN ? <div>Skilliant pays <span className={css.span}>$100</span> for the first <br/>
                                <span className={css.span}>10</span> users on the leaderboard</div>
                            :
                            <div>Skilliant платить <span className={css.span}>$100</span> для перших <br/>
                                <span className={css.span}>10</span> користувачів у таблиці лідерів</div>}
                    </p>

                    <p className={css.fontSize30}>
                        {EN ? <div>Don\'t miss your chance to test <br/> your IT skills and earn some $$$</div>
                            :
                            <div>Не прогав свій шанс протестувати <br/> IT навички та заробити декілька $$$</div>}
                    </p>

                </div>
                {/*<Link to={'/registration'} className={rootCSS.default__button}>*/}
                {/*    {EN ? 'Register now' : 'Зареєструватись зараз'}*/}
                {/*</Link>*/}
                {/*<div onClick={() => setModalOpen(false)}*/}
                {/*     className={css.no__thanks}>{EN ? 'No, thanks' : 'Ні, дякую'}</div>*/}
            </div>
        </div>
    );
};

export {PresentForUser};

// import React from 'react';
//
// import css from './PresentForUser.module.css';
// import {Link} from 'react-router-dom';
// import rootCSS from '../../../styles/root.module.css';
// import {useSelector} from 'react-redux';
//
// const PresentForUser = ({type}) => {
//     // const {EN} = useSelector(state => state['languageReducers']);
//
//     return (
//         <div className={css.modal__wrap}>
//             <div className={css.modal__block}>
//                 <div className={css.modal__text}>
//                     Hello
//                 {/*    {EN ? 'You passed the test successfully ' +*/}
//                 {/*        'but, unfortunately, you won\'t be able to ' +*/}
//                 {/*        'save the result and ' +*/}
//                 {/*        'compete with others ' +*/}
//                 {/*        'by users. We advise you to register to save your result next time' : 'Ви успішно пройшли тест, але, на жаль, не зможете ' +*/}
//                 {/*        'зберегти результат та позмагатися з іншими користувачами. ' +*/}
//                 {/*        'Радимо зареєструватись, щоб наступного разу зберегти свій результат'}*/}
//                 </div>
//                 {/*<Link to={'/registration'} className={rootCSS.default__button}>*/}
//                 {/*    {EN ? 'Register now' : 'Зареєструватись зараз'}*/}
//                 {/*</Link>*/}
//                 {/*<div onClick={() => setModalOpen(false)}*/}
//                 {/*     className={css.no__thanks}>{EN ? 'No, thanks' : 'Ні, дякую'}</div>*/}
//             </div>
//         </div>
//     );
// };
//
// export default PresentForUser;
