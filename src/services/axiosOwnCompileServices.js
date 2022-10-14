import axios from 'axios';

const baseURL = 'https://code3.skilliant.net'

export const axiosOwnCompileServices = axios.create(
    {
        baseURL
    }
);
