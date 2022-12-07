import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {userServices} from '../../services';
import {getLeaderBord} from './achievments.slice';


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
    'achievementsSlice/getAllUsers',
    async () => {
        // async (pageNumber, {rejectWithValue}) => {
        try {
            return await userServices.getAllUsers();
            // return await userServices.getAllUsers(pageNumber);
        } catch (e) {
            // return rejectWithValue(e.message);
            console.error(e);
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
        allUsers: []
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
            oldUser.username = action.payload.username
            oldUser.openForHiring = action.payload.openForHiring
            oldUser.linkedin = action.payload.linkedin
            localStorage.setItem('user', JSON.stringify(oldUser));
        },
        [googleAuth.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
            state.user = null;
            state.roles = null
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
    }
});

export const {setUserFromLocalStorage, setJwtFromLocalStorage, logout, clearError} = userSlice.actions;


const userReducers = userSlice.reducer;


export default userReducers;
