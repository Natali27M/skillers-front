import React from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import css from "./SKLBanner.module.css";

const SklBanner = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const navigate = useNavigate();

    return (
        <div className={css.banner__box} onClick={() => navigate('/skl-token')}>
            <div className={css.banner__content}>
                {EN ?
                    <div className={css.banner__text}>
                        Pass tests successfully and get <span className={css.banner__underline}>SKL</span> token from
                        <span className={css.banner__name}> Skilliant</span>
                    </div>
                    :
                    <div className={css.banner__text}>
                        Проходь успішно тести та отримай <span className={css.banner__underline}>SKL</span> токен
                        від <span className={css.banner__name}>Skilliant</span>
                    </div>
                }
            </div>
            <div className={css.banner__angle}></div>
        </div>

    );
};

export {SklBanner};
