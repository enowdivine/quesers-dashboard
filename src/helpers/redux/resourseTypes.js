import {
  create,
  update,
  allResourceTypes,
  deleteResourceType
} from "../../redux/reducers/resourceType";

export const createResourseType = async (data, dispatch, setLoading) => {
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

export const updateResourseType = async (data, dispatch, setLoading) => {
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

export const getAllResourceTypes = async (dispatch, setLoading) => {
  setLoading(true);
  try {
    const response = await dispatch(allResourceTypes()).then((res) => {
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

export const deleteHandler = async (data, dispatch, setLoading) => {
  setLoading(true);
  try {
    const response = await dispatch(deleteResourceType(data)).then((res) => {
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
