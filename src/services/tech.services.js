import {axiosServices} from './axios.services';

import {urls} from '../config';

export const techServices = {
    getAllTech: () => axiosServices.get(urls.techNames).then(value => value.data.data)
}