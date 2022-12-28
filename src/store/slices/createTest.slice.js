import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {exercisesServices, techServices, testsServices} from '../../services';

export const createTest = createAsyncThunk(
    'createTestSlice/createTest',
    async (data, {rejectWithValue}) => {
        try {
            return await testsServices.createTest(data);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const sendExercise = createAsyncThunk(
    'createTestSlice/sendExercise',
    async ({data, tempId}, {rejectWithValue}) => {
        try {
            const createdEx = await exercisesServices.createExercise(data);
            return {createdEx, tempId};
        } catch (e) {
            rejectWithValue(e);
        }
    }
);
export const sendVariant = createAsyncThunk(
    'createTestSlice/sendVariant',
    async (data, {rejectWithValue}) => {
        try {
            return await exercisesServices.createVariant(data);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);


export const getTechNames = createAsyncThunk(
    'createTestSlice/getTechNames',
    async (codeTest, {rejectWithValue}) => {
        try {
            let technologies = await techServices.getAllTech();
            if (codeTest) {
                technologies = technologies.filter(tech => tech.id !== 8 && tech.id !== 9 && tech.id !== 10);
            }
            return technologies;
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

const createTestSlice = createSlice({
    name: 'createTestSlice',
    initialState: {
        status: null,
        error: null,
        testId: null,
        technology: null,
        techNames: [],
        createdTest: null,
        tempTest: null,
        exercises: [],
        variants: [],
        tempArray: [],
        tempVariantArray: [],
        completedEx: [],
        testFlag: false,
        timeToClear: false
    },

    reducers: {
        clearCreateTest: (state) => {
            state.testId = null;
            state.testId = null;
            state.techNames = [];
            state.createdTest = null;
            state.technology = null;
            state.tempTest = null;
            state.exercises = [];
            state.variants = [];
            state.tempArray = [];
            state.tempVariantArray = [];
            state.completedEx = [];
            state.timeToClear = false;
        },

        createTimeToClear: (state) => {
            state.timeToClear = true;
        },
        createTempTest: (state, action) => {
            state.tempTest = action.payload;
        },
        setTechnology: (state, action) => {
            state.technology = action.payload;
        },
        pushExercise: (state, action) => {
            state.exercises.push(action.payload);
        },
        createExercise: (state) => {
            state.tempArray.push(Date.now());
        },
        createVariant: (state, action) => {
            state.tempVariantArray.push({...action.payload, type: 'variant', varTempId: Date.now()});
        },
        pushVariant: (state, action) => {
            state.variants.push(action.payload);
        },
        deleteExerciseFromArray: (state, action) => {
            state.exercises = state.exercises.filter(item => item.exTempId !== action.payload);
            state.tempArray = state.tempArray.filter(item => item !== action.payload);
            state.tempVariantArray = state.tempVariantArray.filter(item => item.exTempId !== action.payload);
        },
        deleteVariantFromArray: (state, action) => {
            state.variants = state.variants.filter(item => item.varTempId !== action.payload);
            state.tempVariantArray = state.tempVariantArray.filter(item => item.varTempId !== action.payload);
        }
    },

    extraReducers: {
        [createTest.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.testId = action.payload.id;
            state.createdTest = action.payload.attributes;
        },

        [createTest.pending]: (state) => {
            state.status = 'pending';
        },
        [sendExercise.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.completedEx.push({tempId: action.payload.tempId, exerciseId: action.payload.createdEx.id});
        },

        [sendExercise.pending]: (state) => {
            state.status = 'pending';
        },

        [getTechNames.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.techNames = action.payload;
        },

        [getTechNames.pending]: (state) => {
            state.status = 'pending';
        }
    }
});

export const {
    createTempTest,
    clearCreateTest,
    pushVariant,
    setTechnology,
    createExercise,
    createTimeToClear,
    createVariant,
    pushExercise,
    deleteExerciseFromArray,
    deleteVariantFromArray
} = createTestSlice.actions;

const createTestsReducers = createTestSlice.reducer;

export default createTestsReducers;