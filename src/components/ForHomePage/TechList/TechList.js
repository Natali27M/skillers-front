import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import css from './TechList.module.css';
import rootCSS from '../../../styles/root.module.css';
import {SwiperComponent} from '../Swiper/Swiper';

const TechList = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {user} = useSelector(state => state['userReducers']);


    const [techListLoad, setTechListLoad] = useState(false);


    useEffect(() => {
        window.addEventListener('scroll', function () {
            let element = document.querySelector('#testing');
            let position;
            if (element !== null) {
                position = element.getBoundingClientRect();
            } else {
                return;
            }

            if (position.top < window.innerHeight && position.bottom >= 0) {
                setTechListLoad(true);
            }
        });
    }, [techListLoad]);

    return (
        <>
            <div id="testing" className={user ? css.tech__wrap_loginUser : css.tech__wrap}>
                <h4 className={rootCSS.default__title_34}>
                    {EN ? 'Choose your quiz' : 'Виберіть тест'}
                </h4>
                <SwiperComponent techListLoad={techListLoad}/>
            </div>
        </>
    );
};

export {TechList};
