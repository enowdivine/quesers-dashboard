import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}/api/${process.env.REACT_APP_API_VERSION}/schools`;
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


export const deleteResourceType = createAsyncThunk(
    "resourceType/deleteResourceType",
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
            .addCase(update.fulfilled, (state, action) => {
                const id = action.payload.response._id
                const title = action.payload.response.title
                const slug = action.payload.response.slug
                let currentState = current(state).resourceTypes
                let newArray = currentState.map(item => {
                    if (item._id === id) {
                        return { ...item, title, slug }
                    }
                    return item
                })
                state.resourceTypes = newArray
            })
    },
});

// export const {} = resourceSlice.actions;
export default resourceSlice.reducer;
