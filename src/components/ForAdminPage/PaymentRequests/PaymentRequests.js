import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {PaginationSmall} from "../../GeneralComponents";
import {
    confirmPaymentRequest,
    deletePaymentRequest,
    getAllPaymentRequests,
    updateUserAchievement
} from "../../../store";
import css__helper from "../UnUpprovedRecruiters/UnApprovedRecruiters.module.css";
import css from './PaymentRequests.module.css';
import check_green from "../../../images/check-green.svg";
import cross from "../../../images/cross-red.svg";
import {achievementsServices} from "../../../services";

const PaymentRequests = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {
        isDeletedPaymentRequest,
        isConfirmedPaymentRequest,
        paymentRequestsAll
    } = useSelector(state => state['paymentRequestReducers']);

    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [copy, setCopy] = useState(false);

    useEffect(() => {
        dispatch(getAllPaymentRequests(page));
    }, [isDeletedPaymentRequest, isConfirmedPaymentRequest, page, copy])

    const confirm = async (obj) => {
        const {paymentRequestId, coins, idOfUser} = obj
        const res = await achievementsServices.searchUserAchievement(idOfUser);

        await dispatch(confirmPaymentRequest(paymentRequestId));
        return dispatch(updateUserAchievement({achId: res.id, data: {coins}}));
    }

    const makeDelete = (paymentRequestId) => {
        dispatch(deletePaymentRequest(paymentRequestId));
    }

    const copyAddress = (address) => {
        setCopy(true);
        navigator.clipboard.writeText(address);
        return setTimeout(() => {
            setCopy(false)
        }, 2000)
    }

    return (
        <>
            <div className={css__helper.admin__title}>
                {EN ? 'Coin withdrawal requests' : 'Запити на зняття монет'}
            </div>

            <div className={css__helper.recruiter__header}>
                <div className={css.userId}>
                    {EN ? 'User ID' : 'ID'}
                </div>
                <div className={css.userCoinsAll}>
                    {EN ? 'Coins' : 'Монети'}
                </div>
                <div className={css.withdraw}>
                    {EN ? 'Withdraw' : 'Зняти'}
                </div>
                <div className={css.userWallet}>
                    {EN ? 'Wallet' : 'Гаманець'}
                </div>
            </div>


            {
                paymentRequestsAll?.data?.length ? paymentRequestsAll?.data?.map(value =>
                    <div key={value.id} className={css__helper.recruiter}>
                        <div className={css.userId}>{value.attributes.userId}</div>
                        <div className={css.userCoinsAll}>{value.attributes.userCoinsAll}</div>
                        <div className={css.withdraw}>{value.attributes.withdraw}</div>
                        <div className={css.userWallet}>
                            <span className={css.wallet__text}
                                  onClick={() => copyAddress(value.attributes.userWallet)}>
                                {
                                    copy ? (EN ? "Wallet address copied" : "Адресу гаманця скопійовано") : value.attributes.userWallet
                                }
                            </span>
                        </div>
                        <div className={css.delete_confirm}>
                            <div className={css__helper.delete__approve__block}>
                                <div className={css__helper.delete__recruiter}
                                     onClick={() => makeDelete(value?.id)}>
                                    <img src={cross} alt="cross"/>
                                </div>
                                {
                                    !value.attributes.isConfirmed &&
                                    <img src={check_green} alt="check_green"
                                         className={css__helper.check}
                                         onClick={() => confirm({
                                             paymentRequestId: value.id,
                                             coins: value?.attributes?.userCoinsAll - value?.attributes?.withdraw,
                                             idOfUser: value?.attributes?.userId,
                                         })}/>
                                }
                            </div>
                        </div>
                    </div>
                ) : <div>{EN ? 'no code payment request' : 'немає запитів для зняття монеток'}</div>
            }

            <PaginationSmall pageNumber={page}
                             setPageNumber={setPage}
                             pageCount={paymentRequestsAll?.meta?.pagination?.pageCount}
            />
        </>
    );
};

export {PaymentRequests};
