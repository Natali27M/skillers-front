import React, {useState} from 'react';

import css from './Mentor.module.css';
import {MentorDetails} from "../../../ForMentorsPage";

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
            {userId && <MentorDetails mentor={unapprovedMentor} setUserId={setUserId} mentorId={mentor.id}/>}
        </>
    );
};

export {UnapprovedMentor};
