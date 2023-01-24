import {axiosServices} from './axios.services';

import {urls} from '../config';

export const commentsServices = {
    createComment: (obj) => axiosServices.post(urls.comments, {data: {...obj}}).then(value => value.data),
    updateComment: (data, id) => axiosServices.put(`${urls.comments}/${id}`, {data: {...data}})
        .then(value => value.data),
    deleteComment: (commentId) => axiosServices.delete(`${urls.comments}/${commentId}`).then(value => value.data),
}
