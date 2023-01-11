import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import css from "./UnApprovedRecruiters.module.css";
import {createUserRoles, deletedRecruiter, getAllRecruiters, updateIsConfirmed, updateUserRoles} from "../../../store";
import cross from "../../../images/cross-red.svg";
import check_green from "../../../images/check-green.svg";
import check_grey from "../../../images/check-grey.svg";
import {userServices} from "../../../services";
import {PaginationSmall} from '../../GeneralComponents';


const UnApprovedRecruiters = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {
        isDeletedRecruiter,
        isConfirmedRecruiter,
        recruitersAll,
    } = useSelector(state => state['recruiterReducers']);

    const dispatch = useDispatch();

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getAllRecruiters(page))
    }, [isConfirmedRecruiter, isDeletedRecruiter, page]);

    const makeRecruiterDelete = (id) => {
        dispatch(deletedRecruiter(id));
    }

    const confirm = async (confirmed) => {
        const res = await userServices.getMyRoles(confirmed?.userId);

        const {recruiterId, userId, booleanValue} = confirmed;
        const user_role_id = res[0]?.id;
        const user_role_attributes_roles = res[0]?.attributes.roles;

        if (booleanValue) {
            if (res?.length) {
                const newRoles = [...user_role_attributes_roles, 'recruiter'];
                await dispatch(updateUserRoles({rolesId: user_role_id, roles: newRoles}))
                return dispatch(updateIsConfirmed({recruiterId, booleanValue}));
            }
            const newRoles = ['recruiter'];
            await dispatch(createUserRoles({userId: userId, roles: newRoles}));
            return dispatch(updateIsConfirmed({recruiterId, booleanValue}));
        }
        const deletedRecruiterRoleArray = user_role_attributes_roles.filter(value => value !== 'recruiter');
        await dispatch(updateUserRoles({rolesId: user_role_id, roles: deletedRecruiterRoleArray}));
        return dispatch(updateIsConfirmed({recruiterId, booleanValue}));
    }


    return (
        <>
            <h2 className={css.admin__title}>
                {EN ? 'Recruiters' : 'Ректутери'}
            </h2>

            <div className={css.recruiter__header}>
                <div className={css.recruiter__name}>
                    {EN ? 'User' : 'Користувач'}
                </div>
                <div className={css.recruiter__email}>
                    {EN ? 'Email' : 'Пошта'}
                </div>
            </div>

            {
                recruitersAll?.data?.length && recruitersAll.data.map(value =>
                    <div key={value.id} className={css.recruiter}>
                        <div className={css.recruiter__name}>{value.attributes.name}</div>
                        <div className={css.recruiter__email}>{value.attributes.email}
                            <div className={css.delete__approve__block}>
                                <div className={css.delete__recruiter} onClick={() => makeRecruiterDelete(value?.id)}>
                                    <img src={cross} alt="cross"/>
                                </div>
                                <div className={css.approve__recruiter}>
                                    {
                                        value.attributes.isConfirmed ?
                                            <img src={check_grey} alt="check_grey" className={css.check}
                                                 onClick={() => confirm({
                                                     recruiterId: value.id,
                                                     booleanValue: false,
                                                     userId: value.attributes.userId
                                                 })}/> :
                                            <img src={check_green} alt="check_green" className={css.check}
                                                 onClick={() => confirm({
                                                     recruiterId: value.id,
                                                     booleanValue: true,
                                                     userId: value.attributes.userId
                                                 })}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <PaginationSmall pageNumber={page}
                             setPageNumber={setPage}
                             pageCount={recruitersAll.meta?.pagination?.pageCount}
            />

        </>
    );
};

export {UnApprovedRecruiters};
