import {axiosCompileServices} from './axiosCompile.services';
import {axiosOwnCompileServices} from './axiosOwnCompileServices';

import {compileUrls} from '../config';

export const compileServices = {
    judgeCompile: (data) => axiosCompileServices.post(compileUrls.judgeCompile, data).then(value => value.data),
    getLanguages: () => axiosCompileServices.get(compileUrls.languages).then(value => value.data),
    ownCompile: (data) => axiosOwnCompileServices.post(compileUrls.myCompile, data).then(value => value.data)
};