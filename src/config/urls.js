// const baseURL = 'http://localhost:1337';

const baseURL = 'https://api.skillstron.com';

export default baseURL;

export const urls = {
    tests: '/api/tests',
    techNames: '/api/tech-names',
    exercises: '/api/exercises?populate=%2A&filters[testId][$eq]=',
    variants: '/api/variants',

    register: '/api/auth/local/register',
    login: '/api/auth/local',
    user: '/api/users',
    userRoles: '/api/user-roles?filters[userId][$eq]=',

    achievements: '/api/achievements',
    achievementsByUser: '/api/achievements?filters[userId][$eq]=',
    achievementPaginated: '/api/achievements?sort=rating:desc&pagination[pageSize]=15&pagination[page]=',

    googleAuth: 'api/connect/google',
    googleCallback: 'api/auth/google/callback?',

    testResults: '/api/test-results',
    testResultsByUser: '/api/test-results?filters[userId][$eq]=',

    feedback:'/api/feedbacks',

    rates: 'api/rates'
};