import { configureStore } from "@reduxjs/toolkit";
import User from "./reducers/auth";
import Resources from "./reducers/resources";
import Withdrawals from "./reducers/withdrawals";
import Vendors from "./reducers/vendors";
// 
import exams from "./reducers/exams";
import resourceType from "./reducers/resourceType"
import faculties from "./reducers/faculties";
import departments from "./reducers/departments";
import categories from "./reducers/categories";

const store = configureStore({
  reducer: {
    auth: User,
    resource: Resources,
    withdrawal: Withdrawals,
    vendors: Vendors,
    resourceType,
    faculties,
    departments,
    exams,
    categories
  },
});

export default store;
