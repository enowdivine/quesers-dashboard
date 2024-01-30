import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}/api/${process.env.REACT_APP_API_VERSION}/exams`;
const userToken = localStorage.getItem("quesers-admin");

const initialState = {
    exams: [],
    exam: null,
};

export const create = createAsyncThunk(
    "exam/create",
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
    "exam/update",
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


export const allExams = createAsyncThunk(
    "exam/allExams",
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


export const deleteExam = createAsyncThunk(
    "exam/deleteExam",
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

export const examSlice = createSlice({
    name: "exam",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(create.fulfilled, (state, action) => {
                state.exams.unshift(action.payload.exam);
            })
            .addCase(allExams.fulfilled, (state, action) => {
                state.exams = action.payload;
            })
            .addCase(update.fulfilled, (state, action) => {
                const id = action.payload.response._id
                const title = action.payload.response.title
                const slug = action.payload.response.slug
                let currentState = current(state).exams
                let newArray = currentState.map(item => {
                    if (item._id === id) {
                        return { ...item, title, slug }
                    }
                    return item
                })
                state.exams = newArray
            })
    },
});

// export const {} = examSlice.actions;
export default examSlice.reducer;
