import React, {useState} from 'react';
import {useSelector} from "react-redux";

import {MentorDetails} from "../MentorDetails/MentorDetails";
import css from './ApprovedMentor.module.css';
import mail from '../../../images/mail.svg';
import experience from '../../../images/experience.svg';
import english from '../../../images/english.svg';


const ApprovedMentor = ({mentor}) => {
    const approvedMentor = mentor?.attributes;
    const {EN} = useSelector(state => state['languageReducers']);

    const [userId, setUserId] = useState(null);

    return (
        <>
            <div className={css.approvedMentor__block}
                 onClick={() => setUserId(approvedMentor?.userId)}>
                <div className={css.mentor__info__block}>
                    <div className={css.mentor__username}>
                        {approvedMentor.userName}
                    </div>
                    <div className={css.mentor__user__email}>
                        <img src={mail} alt="mail"/>
                        <div>{approvedMentor.userEmail}</div>
                    </div>
                    <div>
                        <a href={approvedMentor?.linkedin} target="_blank" className={css.linked__btn}>
                            LinkedIn
                        </a>
                    </div>
                </div>
                <div className={css.mentor__technologies__block}>
                    {approvedMentor?.technologies?.data?.length ?
                        approvedMentor?.technologies?.data?.map(technology =>
                            <div
                                key={technology.id}
                                className={css.mentor__technology}>
                                {technology.attributes.value}
                            </div>) :
                        <div>{EN ? <span>There are no technologies</span> : <span>Технологій немає</span>}</div>
                    }
                </div>
                <div className={css.mentor__level__block}>
                    <div className={css.mentor__level__block__experience}>
                        <img src={experience} alt="mail"/>
                        <div>{approvedMentor.experience}</div>
                    </div>
                    <div className={css.mentor__level__block__english}>
                        <img src={english} alt="mail"/>
                        <div>{approvedMentor.englishLevel}</div>
                    </div>
                </div>
            </div>
            {userId && <MentorDetails mentor={approvedMentor} setUserId={setUserId} mentorId={mentor.id}/>}
        </>
    );
};

export {ApprovedMentor};
