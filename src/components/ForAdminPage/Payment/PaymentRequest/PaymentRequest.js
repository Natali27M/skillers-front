import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";


import css from "../PaymentRequests/PaymentRequests.module.css";
import css__helper from "../../UnUpprovedRecruiters/UnApprovedRecruiters.module.css";
import cross from "../../../../images/cross-red.svg";
import check_green from "../../../../images/check-green.svg";
import {achievementsServices} from "../../../../services";
import {confirmPaymentRequest, deletePaymentRequest, updateUserAchievement} from "../../../../store";


const PaymentRequest = ({paymentRequest}) => {
    const {EN} = useSelector(state => state['languageReducers']);
    const dispatch = useDispatch();

    const [copy, setCopy] = useState(false);


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
        <div className={css__helper.recruiter}>
            <div className={css.userId}>{paymentRequest.attributes.userId}</div>
            <div className={css.userCoinsAll}>{paymentRequest.attributes.userCoinsAll}</div>
            <div className={css.withdraw}>{paymentRequest.attributes.withdraw}</div>
            <div className={css.userWallet}>
                            <span className={css.wallet__text}
                                  onClick={() => copyAddress(paymentRequest.attributes.userWallet)}>
                                {
                                    copy ? (EN ? "Wallet address copied" : "Адресу гаманця скопійовано") : paymentRequest.attributes.userWallet
                                }
                            </span>
            </div>
            <div className={css.delete_confirm}>
                <div className={css__helper.delete__approve__block}>
                    <div className={css__helper.delete__recruiter}
                         onClick={() => makeDelete(paymentRequest?.id)}>
                        <img src={cross} alt="cross"/>
                    </div>
                    {
                        !paymentRequest.attributes.isConfirmed &&
                        <img src={check_green} alt="check_green"
                             className={css__helper.check}
                             onClick={() => confirm({
                                 paymentRequestId: paymentRequest.id,
                                 coins: paymentRequest?.attributes?.userCoinsAll - paymentRequest?.attributes?.withdraw,
                                 idOfUser: paymentRequest?.attributes?.userId,
                             })}/>
                    }
                </div>
            </div>
        </div>
    );
};

export {PaymentRequest};
