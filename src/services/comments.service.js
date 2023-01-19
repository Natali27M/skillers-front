import {axiosServices} from './axios.services';

import {urls} from '../config';

export const commentsServices = {
    createComment: (obj) => axiosServices.post(urls.comments, {data: {...obj}}).then(value => value.data)
}
