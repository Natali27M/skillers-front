import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import rootCSS from "../../../styles/root.module.css";
import {createRecruiter} from "../../../store";


const RecruiterButton = ({user, setModal, modal}) => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {roles} = useSelector(state => state['userReducers']);
    const {notConfirmedRecruiter} = useSelector(state => state['recruiterReducers']);

    const dispatch = useDispatch();

    const becomeRecruiter = async () => {
        const recruiter = {
            userId: user?.id,
            name: user?.username,
            email: user?.email,
        }
        setModal(!modal);
        await dispatch(createRecruiter(recruiter));
    }

    return (
        <>
            {
                roles && roles.includes('recruiter') && !roles.includes('admin') ? <Link to={'/recruiter'}
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
