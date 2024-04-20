import {
  create,
  update,
  allExams,
  deleteExam
} from "../../redux/reducers/exams";

export const createExam = async (data, dispatch, setLoading) => {
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

export const updateExam = async (data, dispatch, setLoading) => {
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

export const getAllExams = async (dispatch, setLoading) => {
  setLoading(true);
  try {
    const response = await dispatch(allExams()).then((res) => {
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
    const response = await dispatch(deleteExam(data)).then((res) => {
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
