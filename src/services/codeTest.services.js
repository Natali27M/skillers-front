import {axiosServices} from './axios.services';

import {urls} from '../config';

export const codeTestServices = {
    getOneTest: (testId) => axiosServices.get(`${urls.codeTests}/${testId}`).then(value => value.data.data)
};