import {axiosProxyServices} from './axios.proxy.services';
import {proxyUrls, urls} from '../config';
import {axiosServices} from './axios.services';

export const postsProxyServices = {
    // deletePost: (postId) => axiosProxyServices.delete(`${proxyUrls.deletePost}`)
    //     .then(value => value.data),
    deletePost: (postId) => axiosProxyServices.delete(`${proxyUrls.post}/${postId}`).then(value => value.data),
};
