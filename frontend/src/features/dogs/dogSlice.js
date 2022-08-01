import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dogService from './dogService';

const initialState = {
    dogs: [],
    dog: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

// Get all dogs profile
export const getDogs = createAsyncThunk('dogs/getAll', async (_, thunkApi) => {
    try {
        return await dogService.getDogs();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});

// Create Dog Profile
export const createDog = createAsyncThunk('dogs/create', async (data, thunkApi) => {
    try {
        return await dogService.createDog(data);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});

// Get Dog Profile
export const getDog = createAsyncThunk('dogs/getOne', async (id, thunkApi) => {
    try {
        return await dogService.getDog(id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});

// Delete Dog
export const deleteDog = createAsyncThunk('dogs/delete', async (id, thunkApi) => {
    try {
        return await dogService.deleteDog(id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});

// Update Dog
export const updateDog = createAsyncThunk('dogs/update', async (data, thunkApi) => {
    try {
        return await dogService.updateDog(data);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});

export const dogSlice = createSlice({
    name: 'dog',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDogs.fulfilled, (state, action) => {
                state.isLoading = false;
                // state.isSuccess = true;
                state.dogs = action.payload;
            })
            .addCase(getDogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createDog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createDog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.dogs.push(action.payload);
            })
            .addCase(createDog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getDog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dog = action.payload;
            })
            .addCase(getDog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteDog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteDog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.dog = {};
            })
            .addCase(deleteDog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateDog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateDog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.dog = action.payload;
            })
            .addCase(updateDog.rejected, (state, action) => {
                action.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { reset } = dogSlice.actions;

export default dogSlice.reducer;