import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getMentorsPaginatedConfirmed} from "../../../store/slices/mentors.slice";
import {UnapprovedMentor} from "../../ForAdminPage";
import arrow from "../../../images/arrow.svg";
import css from './ConfirmedMentors.module.css';

const ConfirmedMentors = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {
        isDeletedMentor,
        isConfirmedMentor,
        confirmedMentorPage,
    } = useSelector(state => state['mentorReducers']);
    const dispatch = useDispatch();

    const [mentorPageNumber, setMentorPageNumber] = useState(1);

    useEffect(() => {
        dispatch(getMentorsPaginatedConfirmed(mentorPageNumber))
    }, [isDeletedMentor, isConfirmedMentor])
    return (
        <>
            {
                confirmedMentorPage.data.length !==0 ? <div className={css.confirmed__mentors__block}>
                    <div className={css.admin__title}>
                        {EN ? 'Mentors' : 'Ментори'}
                    </div>

                    <div className={css.mentors__header}>
                        <div className={css.mentor__name}>
                            {EN ? 'User' : 'Користувач'}
                        </div>
                        <div className={css.mentor__experience}>
                            {EN ? 'Experience' : 'Досвід'}
                        </div>
                    </div>
                    {confirmedMentorPage?.data && confirmedMentorPage.data.map(value =>
                        <UnapprovedMentor key={value.id} mentor={value}/>)}

                    <div className={css.pagination__wrap}>
                        <div className={css.pagination__block}>
                            <img src={arrow} alt="arrow" className={css.arrow__left}
                                 onClick={() => mentorPageNumber > 1 && setMentorPageNumber(mentorPageNumber - 1)}/>
                            <div>{mentorPageNumber} / {confirmedMentorPage?.meta?.pagination?.pageCount}</div>
                            <img src={arrow} alt="arrow" className={css.arrow__right}
                                 onClick={() => mentorPageNumber < confirmedMentorPage.meta?.pagination?.pageCount && setMentorPageNumber(mentorPageNumber + 1)}/>
                        </div>
                    </div>
                </div> : <></>
            }
        </>
    );
};

export {ConfirmedMentors};
