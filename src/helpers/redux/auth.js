import { login, logout } from "../../redux/reducers/auth";

export const userLogin = async (data, dispatch, setLoading) => {
  setLoading(true);
  try {
    const response = await dispatch(login(data)).then((res) => {
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

export const userLogout = async (dispatch) => {
  try {
    await dispatch(logout());
  } catch (error) {
    return { status: "error", message: "catch error", error };
  }
};
