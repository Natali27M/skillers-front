import React, {useEffect, useState} from 'react';

import {MentorDetails} from "../MentorDetails/MentorDetails";
import css from './ApprovedMentor.module.css';
import css_helper from '../ApprovedMentors/ApprovedMentors.module.css'
import {resultsServices} from "../../../services/results.services";
import {useSelector} from "react-redux";

const ApprovedMentor = ({mentor}) => {
    const approvedMentor = mentor?.attributes;
    const {EN} = useSelector(state => state['languageReducers']);

    const [userId, setUserId] = useState(null);
    const [result, setResult] = useState({});

    useEffect(() => {
        resultsServices.getUserResult(mentor.userId, 1).then(value => setResult(value));
    }, [mentor.userId]);
    return (
        <>
            <div className={css.approvedMentor__block}
                 onClick={() => setUserId(approvedMentor?.userId)}>
                <div className={css_helper.mentor__name__column}>{approvedMentor.userName}</div>
                <div className={css_helper.mentor__technologies__column}>{approvedMentor?.technology?.length}</div>
                <div className={css_helper.mentor__tests__column}>
                    {result.data > 0 ? (EN ? "Available" : 'Наявні') : (EN ? "None" : 'Немає')}
                </div>
                <div className={css_helper.mentor__status__column}>{EN ? 'Yes' : 'Так'}</div>
                <div className={css_helper.mentor__experience__column}>{approvedMentor.experience}</div>
            </div>
            {userId && <MentorDetails mentor={approvedMentor} setUserId={setUserId} mentorId={mentor.id}/>}
        </>
    );
};

export {ApprovedMentor};
