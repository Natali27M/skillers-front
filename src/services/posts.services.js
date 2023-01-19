import {axiosServices} from './axios.services';

import {urls} from '../config';

export const postsServices = {
    createPost: (obj) => axiosServices.post(urls.posts, {data: {...obj}}).then(value => value.data),
}
