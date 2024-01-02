import { configureStore } from "@reduxjs/toolkit";
import User from "./reducers/auth";
import Resources from "./reducers/resources";

const store = configureStore({
  reducer: {
    auth: User,
    resource: Resources,
  },
});

export default store;
