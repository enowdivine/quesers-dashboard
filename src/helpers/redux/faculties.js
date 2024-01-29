import {
  create,
  allFaculties,
  update,
  deleteFacultyHandler
} from "../../redux/reducers/faculties";

export const createFaculty = async (data, dispatch, setLoading) => {
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

export const updateFaculty = async (data, dispatch, setLoading) => {
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

export const getAllFaculties = async (dispatch, setLoading) => {
  setLoading(true);
  try {
    const response = await dispatch(allFaculties()).then((res) => {
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

export const deleteFaculty = async (data, dispatch, setLoading) => {
  setLoading(true);
  try {
    const response = await dispatch(deleteFacultyHandler(data)).then((res) => {
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
