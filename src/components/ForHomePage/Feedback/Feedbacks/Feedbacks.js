import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getFeedbackPaginatedConfirmed} from "../../../../store";
import {Feedback} from "../Feedback/Feedback";
import css from './Feedbacks.module.css';

const Feedbacks = () => {
    const dispatch = useDispatch();

    const {EN} = useSelector(state => state['languageReducers']);
    const {confirmedFeedbackPage} = useSelector(state => state['feedbackReducers']);

    useEffect(() => {
        dispatch(getFeedbackPaginatedConfirmed());
    }, []);


    return (
        <>
            <div className={css.rating__bord_wrap}>
                <div className={css.rating__wrap}>
                    <div className={css.admin__title}>
                        {EN ? 'Feedback' : 'Відгуки'}
                    </div>
                    <div className={css.feedbacks__block}>
                        {!!confirmedFeedbackPage?.data?.length && confirmedFeedbackPage?.data?.map(value => <Feedback
                            key={value.id} feedback={value}/>)}
                    </div>
                </div>
            </div>
        </>
    );
};

export {Feedbacks};
