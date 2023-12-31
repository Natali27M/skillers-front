import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {userServices} from '../../services';
import {usersProxyServices} from '../../services/users.proxy.services';

export const registration = createAsyncThunk(
    'userSlice/registration',
    async (obj, {rejectWithValue}) => {
        try {
            const userData = await userServices.register(obj);
            localStorage.setItem('user', JSON.stringify(userData.user));
            localStorage.setItem('jwt', JSON.stringify(userData.jwt));
            return userData;
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

export const login = createAsyncThunk(
    'userSlice/login',
    async (obj, {rejectWithValue}) => {
        try {
            const userData = await userServices.login(obj);
            localStorage.setItem('user', JSON.stringify(userData.user));
            localStorage.setItem('jwt', JSON.stringify(userData.jwt));
            return userData;
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

export const getUserRoles = createAsyncThunk(
    'userSlice/getUserRoles',
    async (userId, {rejectWithValue}) => {
        try {
            return await userServices.getMyRoles(userId);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserRoles = createAsyncThunk(
    'userSlice/updateUserRoles',
    async (obj, {rejectWithValue}) => {
        try {
            const {rolesId, roles} = obj;
            return userServices.updateUserRoles(rolesId, roles);
        } catch (e) {
            rejectWithValue(e)
        }
    },
);
export const createUserRoles = createAsyncThunk(
    'userSlice/createUserRoles',
    async (obj, {rejectWithValue}) => {
        try {
            return userServices.createUserRoles(obj);
        } catch (e) {
            rejectWithValue(e)
        }
    },
);

export const updateUser = createAsyncThunk(
    'userSlice/updateUser',
    async ({data, userId}, {rejectWithValue}) => {
        try {
            /* let oldUser = JSON.parse(localStorage.getItem('user'));
             oldUser.username = userData.username
             localStorage.setItem('user', JSON.stringify(oldUser));*/
            return await userServices.updateUser(data, userId);
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

export const googleAuth = createAsyncThunk(
    'userSlice/googleAuth',
    async (search, {rejectWithValue}) => {
        try {
            const userData = await userServices.googleAuth(search);
            localStorage.setItem('user', JSON.stringify(userData.user));
            localStorage.setItem('jwt', JSON.stringify(userData.jwt));
            return userData;
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

export const getAllUsers = createAsyncThunk(
    'userSlice/getAllUsers',
    async (startNumber, {rejectWithValue}) => {
        try {
            return await userServices.getAllUsers(startNumber);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getAllUsersByQuery = createAsyncThunk(
    'userSlice/getAllUsersByQuery',
    async ({startNumber, query}, {rejectWithValue}) => {
        try {
            return await userServices.getAllUsersByQuery(startNumber, query);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getUsersTen = createAsyncThunk(
    'usersSlice/getUsersTen',
    async (currentPage, {rejectWithValue}) => {
        try {
            return await usersProxyServices.getUsersTen(currentPage);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getUsersByQueryTen = createAsyncThunk(
    'usersSlice/getUsersByQueryTen',
    async ({currentPage, query}, {rejectWithValue}) => {
        try {
            return await usersProxyServices.getUsersByQueryTen(currentPage, query);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        updateError: null,
        error: null,
        status: null,
        user: null,
        roles: null,
        token: null,
        noUser: true,
        allUsers: [],
        usersTen: [],
    },

    reducers: {
        setUserFromLocalStorage: (state) => {
            state.user = JSON.parse(localStorage.getItem('user'));
        },
        setJwtFromLocalStorage: (state) => {
            state.jwt = JSON.parse(localStorage.getItem('jwt'));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.roles = null;
            localStorage.removeItem('user');
            localStorage.removeItem('jwt');
        },
        clearError: (state) => {
            state.error = null;
        }

    }, extraReducers: {
        [registration.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
            state.user = null;
            state.jwt = null;
            state.roles = null;
        },
        [registration.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action;
        },
        [registration.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        [login.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
            state.user = null;
            state.roles = null;
            state.jwt = null;
        },
        [login.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action;
        },
        [login.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        [updateUser.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
        },
        [updateUser.rejected]: (state, action) => {
            state.status = 'rejected';
            state.updateError = action;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.user = action.payload;
            state.updateError = null;
            let oldUser = JSON.parse(localStorage.getItem('user'));
            oldUser.username = action.payload.username;
            oldUser.openForHiring = action.payload.openForHiring;
            oldUser.linkedin = action.payload.linkedin;
            oldUser.github = action.payload.github;
            oldUser.cv = action.payload.cv;
            oldUser.wallet = action.payload.wallet;
            localStorage.setItem('user', JSON.stringify(oldUser));
        },
        [googleAuth.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
            state.user = null;
            state.roles = null;
            state.jwt = null;
        },
        [googleAuth.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action;
        },
        [googleAuth.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        [getUserRoles.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
            state.roles = null;
        },
        [getUserRoles.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action;
        },
        [getUserRoles.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.roles = action.payload[0]?.attributes?.roles;
        },
        [updateUserRoles.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
        },
        [updateUserRoles.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [updateUserRoles.fulfilled]: (state) => {
            state.status = 'fulfilled';
        },
        [createUserRoles.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
        },
        [createUserRoles.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [createUserRoles.fulfilled]: (state) => {
            state.status = 'fulfilled';
        },
        [getAllUsers.pending]: (state) => {
            state.status = 'pending';
        },

        [getAllUsers.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [getAllUsers.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.allUsers = action.payload;
        },

        [getAllUsersByQuery.pending]: (state) => {
            state.status = 'pending';
        },

        [getAllUsersByQuery.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [getAllUsersByQuery.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.allUsers = action.payload;
        },

        [getUsersTen.pending]: (state) => {
            state.status = 'pending';
        },

        [getUsersTen.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [getUsersTen.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.usersTen = action.payload;
        },

        [getUsersByQueryTen.pending]: (state) => {
            state.status = 'pending';
        },

        [getUsersByQueryTen.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [getUsersByQueryTen.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.usersTen = action.payload;
        },
    }
});

export const {setUserFromLocalStorage, setJwtFromLocalStorage, logout, clearError} = userSlice.actions;


const userReducers = userSlice.reducer;


export default userReducers;
