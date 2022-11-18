import React, {useState} from 'react';

import css from './UnapprovedMentor.module.css';
import {UnapprovedMentorDetails} from "../UnapprovedMentorDetails/UnapprovedMentorDetails";

const UnapprovedMentor = ({mentor}) => {
    const unapprovedMentor = mentor?.attributes;

    const [userId, setUserId] = useState(null);

    return (
        <>
            <div className={css.unapprovedMentor__block}
                 onClick={() => setUserId(unapprovedMentor?.userId)}>
                <div className={css.unapprovedMentor__userName}>{unapprovedMentor.userName}</div>
                <div className={css.unapprovedMentor__experience}>{unapprovedMentor.experience}</div>
            </div>
            {userId && <UnapprovedMentorDetails mentor={unapprovedMentor} setUserId={setUserId} mentorId={mentor.id}/>}
        </>
    );
};

export {UnapprovedMentor};
