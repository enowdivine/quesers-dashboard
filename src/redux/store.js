import { configureStore } from "@reduxjs/toolkit";
import User from "./reducers/auth";
import Resources from "./reducers/resources";
import Withdrawals from "./reducers/withdrawals";
import Vendors from "./reducers/vendors";
// 
import resourceType from "./reducers/resourceType"
import faculties from "./reducers/faculties";
import departments from "./reducers/departments";

const store = configureStore({
  reducer: {
    auth: User,
    resource: Resources,
    withdrawal: Withdrawals,
    vendors: Vendors,
    resourceType,
    faculties,
    departments
  },
});

export default store;
