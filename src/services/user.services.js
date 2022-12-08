import {axiosServices} from './axios.services';
import {urls} from '../config';
import {getAllUsersByQuery} from '../store';


export const userServices = {
    register: (regObj) => axiosServices.post(urls.register, regObj).then(value => value.data),
    login: (regObj) => axiosServices.post(urls.login, regObj).then(value => value.data),
    googleAuth: (search) => axiosServices.get(urls.googleCallback + search).then(value => value.data),
    updateUser: (data, id) => axiosServices.put(`${urls.user}/${id}`, data, {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`}
    }).then(value => value.data),
    getUserById: (userId) => axiosServices.get(`${urls.user}/${userId}`).then(value => value.data),
    getMyRoles: (userId) => axiosServices.get(`${urls.userRoles}${userId}`).then(value => value.data.data),
    getAllUsers: (startNumber) => axiosServices.get(urls.usersPaginated + startNumber).then(value => value.data),
    getAllUsersByQuery: (startNumber, query) =>
        axiosServices.get(urls.usersPaginated + startNumber + '&filters[userName][$contains]=' + query)
            .then(value => value.data)
};
