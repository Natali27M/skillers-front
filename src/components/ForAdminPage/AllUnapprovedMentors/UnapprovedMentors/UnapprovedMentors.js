import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getMentorsPaginated} from "../../../../store/slices/mentors.slice";
import {UnapprovedMentor} from "../UnapprovedMentor/UnapprovedMentor";
import css from "./UnapprovedMentors.module.css";
import arrow from "../../../../images/arrow.svg";

const UnapprovedMentors = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {
        isDeletedMentor,
        isConfirmedMentor,
        mentorPage,
    } = useSelector(state => state['mentorReducers']);
    const dispatch = useDispatch();

    const [mentorPageNumber, setMentorPageNumber] = useState(1);


    useEffect(() => {
        dispatch(getMentorsPaginated(mentorPageNumber))
    }, [mentorPageNumber, isConfirmedMentor, isDeletedMentor])


    return (
        <>
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
            {mentorPage?.data && mentorPage.data.map(value => <UnapprovedMentor key={value.id} mentor={value}/>)}

            <div className={css.pagination__wrap}>
                <div className={css.pagination__block}>
                    <img src={arrow} alt="arrow" className={css.arrow__left}
                         onClick={() => mentorPageNumber > 1 && setMentorPageNumber(mentorPageNumber - 1)}/>
                    <div>{mentorPageNumber} / {mentorPage?.meta?.pagination?.pageCount}</div>
                    <img src={arrow} alt="arrow" className={css.arrow__right}
                         onClick={() => mentorPageNumber < mentorPage.meta?.pagination?.pageCount && setMentorPageNumber(mentorPageNumber + 1)}/>
                </div>
            </div>
        </>
    );
};

export {UnapprovedMentors};
