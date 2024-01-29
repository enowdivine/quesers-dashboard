import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}/api/${process.env.REACT_APP_API_VERSION}/faculties`;
const userToken = localStorage.getItem("quesers-admin");

const initialState = {
    faculties: [],
    faculty: null,
};

export const create = createAsyncThunk(
    "faculty/create",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${url}/create`, data, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const update = createAsyncThunk(
    "faculty/update",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(
                `${url}/update/${data.id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const allFaculties = createAsyncThunk(
    "faculty/allFaculties",
    async (thunkAPI) => {
        try {
            const response = await axios.get(`${url}/`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteFacultyHandler = createAsyncThunk(
    "faculty/deleteFacultyHandler",
    async (data, thunkAPI) => {
        try {
            const response = await axios.delete(`${url}/delete/${data._id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            return response.data;
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const resourceSlice = createSlice({
    name: "faculty",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(create.fulfilled, (state, action) => {
                state.faculties.unshift(action.payload.response);
            })
            .addCase(allFaculties.fulfilled, (state, action) => {
                state.faculties = action.payload;
            })
            .addCase(update.fulfilled, (state, action) => {
                const id = action.payload.response._id
                const title = action.payload.response.title
                const slug = action.payload.response.slug
                const schoolId = action.payload.response.schoolId
                let currentState = current(state).faculties
                let newArray = currentState.map(item => {
                    if (item._id === id) {
                        return { ...item, title, slug, schoolId }
                    }
                    return item
                })
                state.faculties = newArray
            })
    },
});

// export const {} = resourceSlice.actions;
export default resourceSlice.reducer;
