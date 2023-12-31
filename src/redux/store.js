import { configureStore } from "@reduxjs/toolkit";
import User from "./reducers/auth";

const store = configureStore({
  reducer: {
    auth: User,
  },
});

export default store;
