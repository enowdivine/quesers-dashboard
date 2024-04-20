import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}/api/${process.env.REACT_APP_API_VERSION}/categories`;
const userToken = localStorage.getItem("quesers-admin");

const initialState = {
    categories: [],
    category: null,
};

export const create = createAsyncThunk(
    "category/create",
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
    "category/update",
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


export const allCategoriees = createAsyncThunk(
    "category/allCategoriees",
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


export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
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

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(create.fulfilled, (state, action) => {
                state.categories.unshift(action.payload.category);
            })
            .addCase(allCategoriees.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(update.fulfilled, (state, action) => {
                const id = action.payload.response._id
                const title = action.payload.response.title
                const slug = action.payload.response.slug
                let currentState = current(state).categories
                let newArray = currentState.map(item => {
                    if (item._id === id) {
                        return { ...item, title, slug }
                    }
                    return item
                })
                state.categories = newArray
            })
    },
});

// export const {} = categorySlice.actions;
export default categorySlice.reducer;
