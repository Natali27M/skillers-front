import React from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import css from "./SKLBanner.module.css";
import banner__angle from '../../../images/banner-angle.svg'

const SklBanner = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const navigate = useNavigate();

    return (
        <div id='skl__banner' className={css.banner__box} onClick={() => navigate('/skl-token')}>
            <div className={css.banner__content}>
                {EN ?
                    <div className={css.banner__text}>
                        Take a place in the <span className={css.banner__underline}>top</span> three or pass
                        the <span className={css.banner__underline}>tests</span> successfully and get <span
                        className={css.banner__underline}>SKL</span> token from
                        <span className={css.banner__name}> Skilliant</span>
                    </div>
                    :
                    <div className={css.banner__text}>
                        Займаєш місце у <span className={css.banner__underline}>трійці</span> лідерів або проходиш
                        успішно <span className={css.banner__underline}>тести</span> отримуй <span
                        className={css.banner__underline}>SKL</span> токен
                        від <span className={css.banner__name}>Skilliant</span>
                    </div>
                }
            </div>
            <img src={banner__angle} alt="banner__angle" className={css.banner__angle}/>
        </div>

    );
};

export {SklBanner};
