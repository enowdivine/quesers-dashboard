import {
    create,
    allDepartments
  } from "../../redux/reducers/departments";
  
  export const createDepartment = async (data, dispatch, setLoading) => {
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
  
//   export const updateDoc = async (data, dispatch, setLoading) => {
//     setLoading(true);
//     try {
//       const response = await dispatch(update(data)).then((res) => {
//         if (res.meta.requestStatus === "rejected") {
//           return { status: "error", message: "response error", res };
//         } else {
//           return { status: "success", message: res };
//         }
//       });
//       setLoading(false);
//       return response;
//     } catch (error) {
//       setLoading(false);
//       return { status: "error", message: "catch error", error };
//     }
//   };
  

  
  export const getAllDepartments = async (dispatch, setLoading) => {
    setLoading(true);
    try {
      const response = await dispatch(allDepartments()).then((res) => {
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
  
//   export const getSingleDocs = async (data, dispatch, setLoading) => {
//     setLoading(true);
//     try {
//       const response = await dispatch(singleResource(data)).then((res) => {
//         if (res.meta.requestStatus === "rejected") {
//           return { status: "error", message: "response error", res };
//         } else {
//           return { status: "success", message: res };
//         }
//       });
//       setLoading(false);
//       return response;
//     } catch (error) {
//       setLoading(false);
//       return { status: "error", message: "catch error", error };
//     }
//   };
  