import { combineReducers } from "redux";
import UserReducer from "./userReducers";
import CourseReducer from "./courseReducers";
import CategoryReducer from "./categoryReducer";

export const rootReducer = combineReducers({
  UserReducer,
  CourseReducer,
  CategoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
