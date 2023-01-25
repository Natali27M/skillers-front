import {axiosServices} from './axios.services';

import {urls} from '../config';

export const postsServices = {
    createPost: (obj) => axiosServices.post(urls.posts, {data: {...obj}}).then(value => value.data),
    getAllPosts: (pageNumber) => axiosServices
        .get(urls.posts + `?pagination[page]=${pageNumber}&pagination[pageSize]=25&populate=%2A&sort=createdAt:DESC`)
        .then(value => value.data),
    getPostById: (postId) => axiosServices.get(urls.posts + `/${postId}?populate=%2A`).then(value => value.data)
}
