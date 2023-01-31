// const baseURL = 'http://localhost:1339';

const baseURL = 'https://code.skilliant.net';

export default baseURL;

export const proxyUrls = {
    exercises: '/exercises',
    nonce: '/metaMaskAuth/nonce',
    verify: '/metaMaskAuth/verify',
    saveEmail: '/metaMaskAuth/saveEmail',
    usersPaginatedTen: '/users?pagination[pageSize]=10&pagination[page]=',
    post: '/post'
    // usersPaginatedTenByQuery: '/users?pagination[pageSize]=10&pagination[page]='
};
