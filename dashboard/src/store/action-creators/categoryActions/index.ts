import { Dispatch } from "redux";
import {
  CategoryActionType,
  CategoryActions,
} from "../../reducers/categoryReducer/types";
import { toast } from "react-toastify";

import { CreateAsync, DeleteAsync, GetAllAsync, UpdateAsync } from "../../../services/api-category-service";

export const GetAllCategories = () => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionType.START_REQUEST });
      const data = await GetAllAsync();
      const { response } = data;
      console.log("GetAllCourses ", response);
      if (response.success) {
        dispatch({
          type: CategoryActionType.ALL_CATEGORIES_LOADED,
          payload: response.payload,
        });
      } else {
        toast.error(response.message);
      }
    } catch {}
  };
};

export const CreateCategory = (category: any) => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionType.START_REQUEST });
      const data = await CreateAsync(category);
      const { response } = data;

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: CategoryActionType.FINISH_REQUEST,
        payload: response.message,
      });
    } catch {}
  };
};

export const UpdateCategory = (model: any) => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionType.START_REQUEST });
      const data = await UpdateAsync(model);
      const { response } = data;
      console.log("response ", response);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: CategoryActionType.FINISH_REQUEST,
        payload: response.payload,
      });
    } catch {}
  };
}

export const DeleteCategory = (id: number) => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionType.START_REQUEST });
      const data = await DeleteAsync(id);
      const { response } = data;
      console.log("response ", response);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: CategoryActionType.FINISH_REQUEST,
        payload: response.payload,
      });
    } catch {}
  };
}