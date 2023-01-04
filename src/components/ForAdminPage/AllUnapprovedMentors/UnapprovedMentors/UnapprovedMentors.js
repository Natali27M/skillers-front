import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getMentorsPaginated} from "../../../../store/slices/mentors.slice";
import {UnapprovedMentor} from '../UnapprovedMentor/UnapprovedMentor'
import css from "./UnapprovedMentors.module.css";
import {PaginationSmall} from '../../../GeneralComponents';

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
                <PaginationSmall pageNumber={mentorPageNumber}
                                 setPageNumber={setMentorPageNumber}
                                 pageCount={mentorPage.meta?.pagination?.pageCount}
                />

            </div>
        </>
    );
};

export {UnapprovedMentors};
