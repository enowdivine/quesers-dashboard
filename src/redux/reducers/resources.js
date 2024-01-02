import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}/api/${process.env.REACT_APP_API_VERSION}/resource`;

const initialState = {
  resources: [],
  resource: null,
};

export const create = createAsyncThunk(
  "resource/create",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: "Bearer yourAccessToken",
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

export const vendorResources = createAsyncThunk(
  "resource/vendorResources",
  async (vendorId, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/vendor-resources/${vendorId}`);
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

export const singleResource = createAsyncThunk(
  "resource/singleResource",
  async (resourceId, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/resource/${resourceId}`);
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
  name: "resource",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(create.fulfilled, (state, action) => {
        state.resources.push(action.payload);
      })
      .addCase(vendorResources.fulfilled, (state, action) => {
        state.resources = action.payload;
      })
      .addCase(singleResource.fulfilled, (state, action) => {
        state.resource = action.payload;
      });
  },
});

// export const {} = resourceSlice.actions;
export default resourceSlice.reducer;
