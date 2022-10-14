import axios from 'axios';

const baseURL = 'https://code1.skilliant.net'

export const axiosCompileServices = axios.create(
    {
        baseURL
    }
);
