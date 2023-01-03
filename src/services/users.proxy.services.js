import {axiosProxyServices} from './axios.proxy.services';
import {proxyUrls} from '../config';

export const usersProxyServices = {
    getUsersTen: (pageNumber) => axiosProxyServices.get(`${proxyUrls.usersPaginatedTen}` + pageNumber)
        .then(value => value.data),
    getUsersByQueryTen: (currentPage, query) => axiosProxyServices
        .get(`${proxyUrls.usersPaginatedTen}` + currentPage + '&filters[username][$contains]=' + query)
        .then(value => value.data)
};
