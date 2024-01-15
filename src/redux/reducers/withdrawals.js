import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}/api/${process.env.REACT_APP_API_VERSION}/withdrawal`;

const initialState = {
  withdrawals: [],
  withdrawal: null,
};

export const create = createAsyncThunk(
  "withdrawals/create",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/withdrawal-request`, data, {
        headers: {
          "Content-Type": "Application/json",
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

export const vendorRequests = createAsyncThunk(
  "withdrawals/vendorRequests",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/requests/${userId}`);
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

export const allCashoutRequests = createAsyncThunk(
  "withdrawals/allCashoutRequests",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${url}/all-requests`);
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
  name: "withdrawals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(create.fulfilled, (state, action) => {
        state.withdrawals.push(action.payload);
      })
      .addCase(vendorRequests.fulfilled, (state, action) => {
        state.withdrawals = action.payload;
      })
      .addCase(allCashoutRequests.fulfilled, (state, action) => {
        state.withdrawals = action.payload;
      });
  },
});

// export const {} = resourceSlice.actions;
export default resourceSlice.reducer;
