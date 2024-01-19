import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}/api/${process.env.REACT_APP_API_VERSION}/vendor`;

const initialState = {
  vendors: [],
  vendor: null,
};

export const getAllVendors = createAsyncThunk(
  "vendors/getAllVendors",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${url}/vendors`);
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
      const response = await axios.get(`${url}/vendor/${userId}`);
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

export const resourceSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllVendors.fulfilled, (state, action) => {
      state.vendors = action.payload;
    });
  },
});

// export const {} = resourceSlice.actions;
export default resourceSlice.reducer;
