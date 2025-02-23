import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import coursesReducer from "./Dashboard/courseReducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    coursesReducer,
  },
});
export default store;