import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
                `${url}/update-resource/${data.id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        "Content-Type": "multipart/form-data",
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


export const singleResourceType = createAsyncThunk(
    "faculty/singleResourceType",
    async (resourceId, thunkAPI) => {
        try {
            const response = await axios.get(`${url}/resource/${resourceId}`, {
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
    },
});

// export const {} = resourceSlice.actions;
export default resourceSlice.reducer;
