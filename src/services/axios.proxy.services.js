import axios from 'axios';

import baseURL from '../config/proxyUrls';


export const axiosProxyServices = axios.create(
    {
        baseURL
    }
);
