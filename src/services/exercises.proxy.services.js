import {axiosProxyServices} from './axios.proxy.services';

import {proxyUrls} from '../config';

export const exercisesProxyServices = {
    getTestExercises: (testId) => axiosProxyServices.get(`${proxyUrls.exercises}/${testId}`).then(value => value.data.data),
    checkExercises: (data) => axiosProxyServices.post(`${proxyUrls.exercises}/check`, data).then(value => value.data)
};
