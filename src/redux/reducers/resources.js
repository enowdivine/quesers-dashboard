import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}/api/${process.env.REACT_APP_API_VERSION}/resource`;
const userToken = localStorage.getItem("quesers-admin");

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
          Authorization: `Bearer ${userToken}`,
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

export const update = createAsyncThunk(
  "resource/update",
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

export const updateStatus = createAsyncThunk(
  "resource/updateStatus",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${url}/update-status/${data.docId}`,
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

export const allResources = createAsyncThunk(
  "resource/allResources",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${url}/resources`, {
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

export const vendorResources = createAsyncThunk(
  "resource/vendorResources",
  async (vendorId, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/vendor-resources/${vendorId}`, {
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

export const singleResource = createAsyncThunk(
  "resource/singleResource",
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
      .addCase(allResources.fulfilled, (state, action) => {
        state.resources = action.payload;
      })
      .addCase(singleResource.fulfilled, (state, action) => {
        state.resource = action.payload;
      });
  },
});

// export const {} = resourceSlice.actions;
export default resourceSlice.reducer;
