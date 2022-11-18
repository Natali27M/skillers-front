import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getMentorsPaginated} from "../../../../store/slices/mentors.slice";
import {UnapprovedMentor} from "../UnapprovedMentor/UnapprovedMentor";
import css from "./UnapprovedMentors.module.css";
import arrow from "../../../../images/arrow.svg";

const UnapprovedMentors = () => {
    const {isDeletedMentor, isConfirmedMentor, mentorPage} = useSelector(state => state['mentorReducers']);
    const dispatch = useDispatch();

    const [mentorPageNumber, setMentorPageNumber] = useState(1);


    useEffect(() => {
        dispatch(getMentorsPaginated(mentorPageNumber))
    }, [mentorPageNumber, isConfirmedMentor, isDeletedMentor])


    return (
        <>
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
