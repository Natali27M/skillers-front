import React from 'react';

import css from './BadgeMini.module.css';
import {Link} from 'react-router-dom';
import badge_bg from '../../../images/badges/badge-bg.svg';
import java from '../../../images/techList/java.svg';
import python from '../../../images/techList/python.svg';
import js from '../../../images/techList/javascript.svg';
import csharp from '../../../images/techList/csharp.svg';
import cplusplus from '../../../images/techList/cplusplus.svg';
import html5 from '../../../images/techList/html5.svg';
import other from '../../../images/techList/other.svg';
import manager from '../../../images/techList/project-manager.svg';
import star from '../../../images/badges/star.svg';

const BadgeMini = ({badge}) => {
    const techId = badge?.techId;

    const starsArray = [];

    for (let i = 0; i < badge?.count; i++) {
        starsArray.push(i);
    }

    return (
        <div className={css.badge}>
            <img className={css.badge__bg} src={badge_bg} alt="badge"/>
            <div className={css.badge_content}>
                <img src={techId === 3 ? java : techId === 4 ? python : techId === 5 ? js :
                    techId === 6 ? csharp : techId === 7 ? cplusplus : techId === 8 ? html5 :
                        techId === 9 ? other : manager
                } className={css.badge__tech_img} alt="js"/>
                <div className={css.stars__wrap}>
                    {starsArray?.map(starImg => <img key={starImg} className={css.star__img} src={star} alt="star"/>)}
                </div>
            </div>
        </div>
    );
};

export {BadgeMini};