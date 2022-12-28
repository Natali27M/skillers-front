import {axiosProxyServices} from "./axios.proxy.services";
import {proxyUrls} from "../config";

export const MetamaskService = {
    nonce: (address) => axiosProxyServices.post(proxyUrls.nonce, {address}),
    verify: (address, signature, nonce) => axiosProxyServices.post(proxyUrls.verify, {address, signature, nonce}),
    saveEmail: (email, address) => axiosProxyServices.post(proxyUrls.saveEmail, {email, address}),
};
