import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:5000/api/User",
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config: any) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Validation failed, ...
      if (err.response.status === 400 && err.response.data) {
        return Promise.reject(err.response.data);
      }
      // Access Token was expired
      if (
        err.response.status === 401 &&
        !originalConfig._retry &&
        getAccessToken() != null
      ) {
        originalConfig._retry = true;
        try {
          const rs = await refreshAccessToken();
          const { accessToken, refreshToken } = rs.data;
          setRefreshToken(refreshToken);
          setAccessToken(accessToken);
          instance.defaults.headers.common["Authorization"] =
            "Bearer " + accessToken;
          return instance(originalConfig);
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
      if (err.response.status === 404) {
        if (axios.isAxiosError(err)) {
          return Promise.reject(err.response.data);
        }
        return;
      }
    }
    return Promise.reject(err);
  }
);

function refreshAccessToken() {
  console.log("refreshAccessToken");
  return instance.post("/RefreshToken", {
    token: getAccessToken(),
    refreshToken: getrefreshToken(),
  });
}

export function setAccessToken(token: string) {
  window.localStorage.setItem("accessToken", token);
}

export function setRefreshToken(token: string) {
  window.localStorage.setItem("refreshToken", token);
}

export function setSelectedUser(user: any) {
  window.localStorage.setItem("selectedUser", user);
}

export function getAccessToken(): null | string {
  const accessToken = window.localStorage.getItem("accessToken");
  return accessToken;
}

export function getrefreshToken(): null | string {
  const refreshToken = window.localStorage.getItem("refreshToken");
  return refreshToken;
}

export function getSelectedUser(): null | any {
  const selectedUserId = window.localStorage.getItem("selectedUser");
  return selectedUserId;
}

export function removeTokens() {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
}
export function removeSelectedUserId()
{
  window.localStorage.removeItem("selectedUserId");
}

const responseBody: any = (response: any) => response.data;

const request = {
  get: (url: string) => instance.get(url).then().then(responseBody),
  post: (url: string, body?: any) =>
    instance.post(url, body).then().then(responseBody),
};

const User = {
  Insert: (user: any) => request.post("/register", user),
  Login: (user: any) => request.post("/login", user),
  Logout: (id: string) => request.get("/logout?userId=" + id),
  GetAll: () => request.get("/users"),
  UpdateProfile: (model: any) => request.post("/update", model),
  Delete: (id: string) => request.get("/delete?userId=" + id),
  ConfirmEmail: (confirmData: any) => request.post("/сonfirmEmail", confirmData),
  BlockUnblock: (id: string) => request.get("/blockUnblock?userId=" + id),
  ResetPassword: (resetData: any) => request.post("/resetPassword", resetData),
  SendResetEmail: (email: string) => request.get("/sendResetEmail?email="+ email),
};

export async function Insert(user: any) {
  const data = await User.Insert(user)
    .then((response) => {
      return { response };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function Login(user: any) {
  const data = await User.Login(user)
    .then((response) => {
      return { response };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function Logout(id: string) {
  const data = await User.Logout(id)
    .then((response) => {
      return { response };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function GetAll()
{
    removeSelectedUserId();
    const data = await User.GetAll()
    .then((response) => {
      return { response};
    })
    .catch((error) => {
      return error.response;
    });
  console.log("In service ", data);
  return data;
}

export async function UpdateProfileAsync(model: any)
{
    const data = await User.UpdateProfile(model)
    .then((response) => {
      return { response};
    })
    .catch((error) => {
      return error.response;
    });
  console.log("In service ", data);
  return data;
}

export async function DeleteAsync(id:string)
{
    const data = await User.Delete(id)
    .then((response) => {
      return { response};
    })
    .catch((error) => {
      return error.response;
    });
  console.log("In service ", data);
  return data;
}

export async function BlockUnblockAsync(id:string)
{
   
    const data = await User.BlockUnblock(id)
    .then((response) => {
      return { response};
    })
    .catch((error) => {
      return error.response;
    });
  console.log("In service ", data);
  return data;
}

export async function ConfirmEmailAsync(confirmData:any) {
  const data = await User.ConfirmEmail(confirmData)
  .then((response) => {
    return { response};
  })
  .catch((error) => {
    return error.response;
  });
  console.log("In service ", data);
  return data;
}

export async function ResetPasswordAsync(resetData: any) {
  const data = await User.ResetPassword(resetData)
  .then((response) => {
    return { response};
  })
  .catch((error) => {
    return error.response;
  });
  console.log("In service ", data);
  return data;
}

export async function SendResetEmailAsync(email: any) {
  const data = await User.SendResetEmail(email)
  .then((response) => {
    return { response};
  })
  .catch((error) => {
    return error.response;
  });
  console.log("In service ", data);
  return data;
}

