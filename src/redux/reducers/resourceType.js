import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}/api/${process.env.REACT_APP_API_VERSION}/resource-types`;
const userToken = localStorage.getItem("quesers-admin");

const initialState = {
    resourceTypes: [],
    resourceType: null,
};

export const create = createAsyncThunk(
    "resourceType/create",
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
    "resourceType/update",
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


export const allResourceTypes = createAsyncThunk(
    "resourceType/allResourceTypes",
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
    "resourceType/singleResourceType",
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
    name: "resourceType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(create.fulfilled, (state, action) => {
                state.resourceTypes.unshift(action.payload.resourceType);
            })
            .addCase(allResourceTypes.fulfilled, (state, action) => {
                state.resourceTypes = action.payload;
            })
    },
});

// export const {} = resourceSlice.actions;
export default resourceSlice.reducer;
