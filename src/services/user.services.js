import {axiosServices} from './axios.services';
import {proxyUrls, urls} from '../config';


export const userServices = {
    register: (regObj) => axiosServices.post(urls.register, regObj).then(value => value.data),
    login: (regObj) => axiosServices.post(urls.login, regObj).then(value => value.data),
    googleAuth: (search) => axiosServices.get(urls.googleCallback + search).then(value => value.data),
    updateUser: (data, id) => axiosServices.put(`${urls.user}/${id}`, data, {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`}
    }).then(value => value.data),
    getUserById: (userId) => axiosServices.get(`${urls.user}/${userId}`).then(value => value.data),
    getUserByEmail: (email) => axiosServices.get(`${urls.user}?filters[email][$eq]=${email}`).then(value => value.data),
    getAllUsers: () => axiosServices.get(urls.user).then(value => value.data),
    getMyRoles: (userId) => axiosServices.get(`${urls.userRoles}${userId}`).then(value => value.data.data),
    updateUserRoles: (roleId, roles) => axiosServices.put(urls.allRoles + `/${roleId}`, {data: {roles}}).then(value => value.data.data),
    createUserRoles: (newRole) => axiosServices.post(urls.allRoles, {data: newRole}).then(value => value.data.data),
    //getMyRoles: (userId) => axiosServices.get(`${urls.userRoles}${userId}`).then(value => value.data.data),
    // getAllUsers: (startNumber) => axiosServices.get(urls.usersPaginated + startNumber).then(value => value.data),
};
