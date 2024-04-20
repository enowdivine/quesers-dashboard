import {
  getAllVendors,
  setProfileImage,
  getSingleVendorDetails,
  updateStatus
} from "../../redux/reducers/vendors";

export const allVendors = async (dispatch, setLoading) => {
  setLoading(true);
  try {
    const response = await dispatch(getAllVendors()).then((res) => {
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

export const getVendorDetails = async (data, dispatch, setLoading) => {
  setLoading(true);
  try {
    const response = await dispatch(getSingleVendorDetails(data)).then(
      (res) => {
        if (res.meta.requestStatus === "rejected") {
          return { status: "error", message: "response error", res };
        } else {
          return { status: "success", message: res };
        }
      }
    );
    setLoading(false);
    return response;
  } catch (error) {
    setLoading(false);
    return { status: "error", message: "catch error", error };
  }
};

export const uploadProfileImage = async (data, dispatch, setLoading) => {
  setLoading(true);
  try {
    const response = await dispatch(setProfileImage(data)).then((res) => {
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

export const updateVendorStatus = async (data, dispatch, setLoading) => {
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
