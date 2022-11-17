import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getMentorsPaginated} from "../../../../store/slices/mentors.slice";
import {UnapprovedMentor} from "../UnapprovedMentor/UnapprovedMentor";

const UnapprovedMentors = () => {
    const {isDeletedMentor, isConfirmedMentor, mentorPage} = useSelector(state => state['mentorReducers']);
    const dispatch = useDispatch();

    const [mentorPageNumber, setMentorPageNumber] = useState(1);


    useEffect(() => {
        dispatch(getMentorsPaginated(mentorPageNumber))
    }, [isDeletedMentor, isConfirmedMentor])

    const logMentors = () => {
        console.log(mentorPage);
    }

    return (
        <>
            {mentorPage?.data && mentorPage.data.map(value =><UnapprovedMentor key={value.id} mentor={value}/>)}
            <button onClick={() => logMentors()}>Clock here</button>
        </>
    );
};

export {UnapprovedMentors};
