import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
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

export const updateStatus = createAsyncThunk(
  "withdrawals/updateStatus",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${url}/update-status/${data.id}`,
        data,
        {
          headers: {
            "Content-Type": "Application/json",
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
        state.withdrawals.push(action.payload.withdrawal);
      })
      .addCase(vendorRequests.fulfilled, (state, action) => {
        state.withdrawals = action.payload;
      })
      .addCase(allCashoutRequests.fulfilled, (state, action) => {
        state.withdrawals = action.payload;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        const id = action.payload.updated._id;
        const status = action.payload.updated.status;
        let currentState = current(state).withdrawals;
        let newArray = currentState.map((item) => {
          if (item._id === id) {
            return { ...item, status: status };
          }
          return item;
        });
        state.withdrawals = newArray;
      });
  },
});

// export const {} = resourceSlice.actions;
export default resourceSlice.reducer;
