import { Dispatch } from "redux";
import { UserActionType, UserActions } from "../../reducers/userReducers/types";
import {
  ConfirmEmailAsync,
  DeleteAsync,
  GetAll,
  Insert,
  Login,
  Logout,
  removeTokens,
  BlockUnblockAsync,
  ResetPasswordAsync,
  SendResetEmailAsync,
  setAccessToken,
  setRefreshToken,
  UpdateProfileAsync,
} from "../../../services/api-user-service";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

export const InsertUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Insert(user);
      const { response } = data;

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.message,
      });
    } catch {}
  };
};

export const LoginUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Login(user);
      const { response } = data;
      console.log("response ", response);

      if (response.success) {
        const { accessToken, refreshToken, message } = response;
        removeTokens();
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        toast.success(response.message);
        AuthUser(accessToken, response.message, dispatch);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.message,
      });
    } catch {}
  };
};

export const LogOut = (id: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Logout(id);
      const { response } = data;
      if (response.success) {
        removeTokens();
        toast.success(response.message);
        dispatch({
          type: UserActionType.LOGOUT_USER,
        });
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.message,
      });
    } catch {}
  };
};

export const AuthUser = (
  token: string,
  message: string,
  dispatch: Dispatch<UserActions>) => {
  const decodedToken = jwtDecode(token) as any;
  dispatch({
    type: UserActionType.LOGIN_USER_SUCCESS,
    payload: {
      message,
      decodedToken,
    },
  });
};

export const GetAllUsers = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST});
      const data = await GetAll();
      const { response } = data;
      console.log("response ", response);
      if (response.success) {
        // toast.success(response.message);
        dispatch({
          type: UserActionType.ALL_USERS_LOADED,
          payload: response.payload,
        });
      } else {
        toast.error(response.message);
      }
      
    } catch {}
  };
}

export const SetSelectedUser = (userData: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      console.log("ud ", userData);
      dispatch({ 
        type: UserActionType.SELECTED_USER,
        payload: userData,
      });
    } catch {}
  };
}

export const UpdateProfile = (model: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await UpdateProfileAsync(model);
      const { response } = data;
      console.log("response ", response);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.payload,
      });
    } catch {}
  };
}

export const DeleteUser = (id: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await DeleteAsync(id);
      const { response } = data;
      console.log("response ", response);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.payload,
      });
    } catch {}
  };
}

export const ConfirmEmail = (confirmData:any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await ConfirmEmailAsync(confirmData);
      const { response } = data;
      console.log("response ", response);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.payload,
      });
    } catch {}
  };
}

export const BlockUnblock = (userId: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await BlockUnblockAsync(userId);
      const { response } = data;
      console.log("response ", response);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.payload,
      });
    } catch {}
  };
}

export const ResetPassword = (resetData: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await ResetPasswordAsync(resetData);
      const { response } = data;
      console.log("response ", response);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.payload,
      });
    } catch {}
  };
}
export const SendResetEmail = (email: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await SendResetEmailAsync(email);
      const { response } = data;
      console.log("response ", response);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.payload,
      });
    } catch {}
  };
}