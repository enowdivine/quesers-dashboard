import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}/api/${process.env.REACT_APP_API_VERSION}/vendor`;
const userToken = localStorage.getItem("quesers-admin");

const initialState = {
  vendors: [],
  vendor: null,
};

export const getAllVendors = createAsyncThunk(
  "vendors/getAllVendors",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${url}/vendors`, {
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

export const getSingleVendorDetails = createAsyncThunk(
  "vendors/getSingleVendorDetails",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/vendor/${userId}`, {
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

export const setProfileImage = createAsyncThunk(
  "vendors/setProfileImage",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${url}/upload-profile-image/${data.id}`,
        data.data,
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

export const updateStatus = createAsyncThunk(
  "vendors/updateStatus",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${url}/update-vendor-status/${data.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
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

export const resourceSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllVendors.fulfilled, (state, action) => {
      state.vendors = action.payload;
    })
      .addCase(updateStatus.fulfilled, (state, action) => {
        const id = action.payload.response._id
        const status = action.payload.response.status
        let currentState = current(state).vendors
        let newArray = currentState.map(item => {
          if (item._id === id) {
            return { ...item, status }
          }
          return item
        })
        state.vendors = newArray
      })
  },
});

// export const {} = resourceSlice.actions;
export default resourceSlice.reducer;
