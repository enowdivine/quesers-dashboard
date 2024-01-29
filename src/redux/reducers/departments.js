import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}/api/${process.env.REACT_APP_API_VERSION}/departments`;
const userToken = localStorage.getItem("quesers-admin");

const initialState = {
    departments: [],
    department: null,
};

export const create = createAsyncThunk(
    "department/create",
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
    "department/update",
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


export const allDepartments = createAsyncThunk(
    "department/allDepartments",
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


export const deleteDprmt = createAsyncThunk(
    "department/deleteDprmt",
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
    name: "department",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(create.fulfilled, (state, action) => {
                state.departments.unshift(action.payload.response);
            })
            .addCase(allDepartments.fulfilled, (state, action) => {
                state.departments = action.payload;
            })
            .addCase(update.fulfilled, (state, action) => {
                const id = action.payload.response._id
                const title = action.payload.response.title
                const slug = action.payload.response.slug
                const facultyId = action.payload.response.facultyId
                let currentState = current(state).faculties
                let newArray = currentState.map(item => {
                    if (item._id === id) {
                        return { ...item, title, slug, facultyId }
                    }
                    return item
                })
                state.faculties = newArray
            })
    },
});

// export const {} = resourceSlice.actions;
export default resourceSlice.reducer;
