// const baseURL = 'http://localhost:1337';

//const baseURL = 'https://test-api.skilliant.net';

const baseURL = 'https://api.skilliant.net';

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
    usersPaginated: '/api/users?limit=10&start=',

    achievements: '/api/achievements',
    achievementsByUser: '/api/achievements?filters[userId][$eq]=',
    achievementPaginated: '/api/achievements?sort=rating:desc&pagination[pageSize]=15&pagination[page]=',
    achievementPaginatedTen: '/api/achievements?sort=rating:desc&pagination[pageSize]=10&pagination[page]=',

    googleAuth: 'api/connect/google',
    googleCallback: 'api/auth/google/callback?',

    testResults: '/api/test-results',
    testResultsByUser: '/api/test-results?filters[userId][$eq]=',

    fullTestResults: '/api/full-test-results',

    feedback: '/api/feedbacks',
    mentors: '/api/mentors',
    technologies: '/api/technology',

    rates: 'api/rates'
};
