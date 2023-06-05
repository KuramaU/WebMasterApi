import { Dispatch } from "redux";
import {
  CourseActionType,
  CourseActions,
} from "../../reducers/courseReducers/types";
import { toast } from "react-toastify";

import { Create, DeleteAsync, GetAll, UpdateAsync } from "../../../services/api-course-service";

export const GetAllCourses = () => {
  return async (dispatch: Dispatch<CourseActions>) => {
    try {
      dispatch({ type: CourseActionType.START_REQUEST });
      const data = await GetAll();
      const { response } = data;
      console.log("GetAllCourses ", response);
      if (response.success) {
        dispatch({
          type: CourseActionType.ALL_COURSES_LOADED,
          payload: response.payload,
        });
      } else {
        toast.error(response.message);
      }
    } catch {}
  };
};

export const CreateCourse = (course: any) => {
  return async (dispatch: Dispatch<CourseActions>) => {
    try {
      dispatch({ type: CourseActionType.START_REQUEST });
      const data = await Create(course);
      const { response } = data;

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: CourseActionType.FINISH_REQUEST,
        payload: response.message,
      });
    } catch {}
  };
};

export const UpdateCourse = (model: any) => {
  return async (dispatch: Dispatch<CourseActions>) => {
    try {
      dispatch({ type: CourseActionType.START_REQUEST });
      const data = await UpdateAsync(model);
      const { response } = data;
      console.log("response ", response);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: CourseActionType.FINISH_REQUEST,
        payload: response.payload,
      });
    } catch {}
  };
}

export const DeleteCourse = (id: number) => {
  return async (dispatch: Dispatch<CourseActions>) => {
    try {
      dispatch({ type: CourseActionType.START_REQUEST });
      const data = await DeleteAsync(id);
      const { response } = data;
      console.log("response ", response);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: CourseActionType.FINISH_REQUEST,
        payload: response.payload,
      });
    } catch {}
  };
}