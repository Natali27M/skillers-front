import React from 'react';

import css from './UnapprovedMentor.module.css';

const UnapprovedMentor = ({mentor}) => {
    const unapprovedMentor = mentor?.attributes;
    return (
        <div className={css.unapprovedMentor__block}>
            <div className={css.unapprovedMentor__userName}>{unapprovedMentor.userName}</div>
            <div className={css.unapprovedMentor__experience}>{unapprovedMentor.experience}</div>
        </div>
    );
};

export {UnapprovedMentor};
