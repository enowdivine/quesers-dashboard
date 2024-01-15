import {
  create,
  update,
  updateStatus,
  vendorResources,
  singleResource,
  allResources,
} from "../../redux/reducers/resources";

export const uploadDoc = async (data, dispatch, setLoading) => {
  setLoading(true);
  try {
    const response = await dispatch(create(data)).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        return { status: "error", message: "response error", res };
      } else {
        return { status: "success", message: res };
      }
    });
    setLoading(false);
    return response;
  } catch (error) {
    setLoading(false);
    return { status: "error", message: "catch error", error };
  }
};

export const updateDoc = async (data, dispatch, setLoading) => {
  setLoading(true);
  try {
    const response = await dispatch(update(data)).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        return { status: "error", message: "response error", res };
      } else {
        return { status: "success", message: res };
      }
    });
    setLoading(false);
    return response;
  } catch (error) {
    setLoading(false);
    return { status: "error", message: "catch error", error };
  }
};

export const updateDocStatus = async (data, dispatch, setLoading) => {
  setLoading(true);
  try {
    const response = await dispatch(updateStatus(data)).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        return { status: "error", message: "response error", res };
      } else {
        return { status: "success", message: res };
      }
    });
    setLoading(false);
    return response;
  } catch (error) {
    setLoading(false);
    return { status: "error", message: "catch error", error };
  }
};

export const getAllDocs = async (dispatch, setLoading) => {
  setLoading(true);
  try {
    const response = await dispatch(allResources()).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        return { status: "error", message: "response error", res };
      } else {
        return { status: "success", message: res };
      }
    });
    setLoading(false);
    return response;
  } catch (error) {
    setLoading(false);
    return { status: "error", message: "catch error", error };
  }
};

export const getVendorDocs = async (data, dispatch, setLoading) => {
  setLoading(true);
  try {
    const response = await dispatch(vendorResources(data)).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        return { status: "error", message: "response error", res };
      } else {
        return { status: "success", message: res };
      }
    });
    setLoading(false);
    return response;
  } catch (error) {
    setLoading(false);
    return { status: "error", message: "catch error", error };
  }
};

export const getSingleDocs = async (data, dispatch, setLoading) => {
  setLoading(true);
  try {
    const response = await dispatch(singleResource(data)).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        return { status: "error", message: "response error", res };
      } else {
        return { status: "success", message: res };
      }
    });
    setLoading(false);
    return response;
  } catch (error) {
    setLoading(false);
    return { status: "error", message: "catch error", error };
  }
};
