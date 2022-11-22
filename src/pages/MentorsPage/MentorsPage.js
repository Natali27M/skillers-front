import React from 'react';

import css from './MentorsPage.module.css';
import rootCSS from "../../styles/root.module.css";
import {ApprovedMentors} from "../../components";

const MentorsPage = () => {
    return (
        <div className={css.mentors__page}>
            <div className={rootCSS.root__background}></div>
            <div className={css.mentors__block__wrap}>
                <ApprovedMentors/>
            </div>

        </div>
    );
};

export {MentorsPage};
