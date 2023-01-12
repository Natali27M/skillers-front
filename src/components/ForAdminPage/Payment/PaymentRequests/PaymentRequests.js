import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {PaginationSmall} from "../../../GeneralComponents";
import {getAllPaymentRequests} from "../../../../store";
import css__helper from "../../UnUpprovedRecruiters/UnApprovedRecruiters.module.css";
import css from './PaymentRequests.module.css';
import {PaymentRequest} from "../PaymentRequest/PaymentRequest";

const PaymentRequests = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {
        isDeletedPaymentRequest,
        isConfirmedPaymentRequest,
        paymentRequestsAll
    } = useSelector(state => state['paymentRequestReducers']);

    const dispatch = useDispatch();

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getAllPaymentRequests(page));
    }, [isDeletedPaymentRequest, isConfirmedPaymentRequest, page])

    return (
        <>
            <h2 className={css__helper.admin__title}>
                {EN ? 'Coin withdrawal requests' : 'Запити на зняття монет'}
            </h2>

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
                paymentRequestsAll?.data?.length ? paymentRequestsAll?.data?.map(value => <PaymentRequest key={value.id}
                                                                                                          paymentRequest={value}/>
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
