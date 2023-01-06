import {axiosServices} from "./axios.services";

import {urls} from "../config";

export const paymentRequestsService = {
    createPaymentRequest: (paymentRequest) => axiosServices.post(urls.paymentRequests, {
        data: {
            ...paymentRequest,
            isConfirmed: false
        }
    }).then(value => value.data),
    checkPaymentRequestOfUserNotConfirmed: (userId) => axiosServices(urls.paymentRequests + `?filters[userId][$eq]=${userId}&filters[isConfirmed][$eq]=false`)
        .then(value => value.data),
    getAllPaymentRequests: (page) => axiosServices.get(urls.paymentRequests + `?pagination[page]=${page}&pagination[pageSize]=10&sort=createdAt:desc`)
        .then(value => value.data),
    confirmPaymentRequest: (id) => axiosServices.put(urls.paymentRequests + `/${id}`, {data: {isConfirmed: true}})
        .then(value => value.data),
    deletePaymentRequest: (id) => axiosServices.delete(urls.paymentRequests + `/${id}`)
        .then(value => value.data),
}
