import { configureStore } from "@reduxjs/toolkit";
import User from "./reducers/auth";
import Resources from "./reducers/resources";
import Withdrawals from "./reducers/withdrawals";
import Vendors from "./reducers/vendors";

const store = configureStore({
  reducer: {
    auth: User,
    resource: Resources,
    withdrawal: Withdrawals,
    vendors: Vendors,
  },
});

export default store;
