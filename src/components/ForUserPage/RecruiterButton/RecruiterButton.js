import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import rootCSS from "../../../styles/root.module.css";
import {createRecruiter, getRecruiterByUserIdNotConfirmed} from "../../../store";


const RecruiterButton = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user, roles} = useSelector(state => state['userReducers']);
    const {notConfirmedRecruiter, status} = useSelector(state => state['recruiterReducers']);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecruiterByUserIdNotConfirmed(user.id))
    }, [notConfirmedRecruiter]);


    const becomeRecruiter = () => {
        const recruiter = {
            userId: user?.id
        }
        dispatch(createRecruiter(recruiter))
    }

    return (
        <>
            {
                roles && roles.includes('recruiter') ? <Link to={'/recruiter'}
                                                             className={rootCSS.default__button}>{EN ? 'For recruiters' : 'Рекрутерам'}
                    </Link> :
                    <>
                        {
                            notConfirmedRecruiter ? <></> :
                                <div
                                    className={rootCSS.default__button}
                                    onClick={() => becomeRecruiter()}>{EN ? 'Become recruiter' : 'Стати рекрутером'}</div>

                        }
                    </>
            }

        </>
    );
};

export {RecruiterButton};
