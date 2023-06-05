import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./containers";
import DefaultPage from "./pages/defaultPage";
import NotFound from "./pages/notFound";
import SignUp from "./pages/auth/signUp";
import { useTypedSelector } from "./hooks/useTypedSelector";

import Profile from "./pages/profile";
import Register from "./pages/auth/signUp";
import Users from "./pages/users";
import Courses from "./pages/courses";
import SignIn from "./pages/auth/singIn";
import ResetPassword from "./pages/resetPassword";
import SendResetPasswordEmail from "./pages/resetPassword/index2";
import ConfirmEmail from "./pages/confirmEmail";
import AddCourse from "./pages/addCourse";
import UpdateCourse from "./pages/updateCourse";
import Categories from "./pages/categories";
import AddCategory from "./pages/addCategory";
import UpdateCategory from "./pages/updateCategory";


const App: React.FC = () => {
  const { isAuth, user } = useTypedSelector((store) => store.UserReducer);
  return (
    <Routes>
      {isAuth && (
        <>
          {user.role === "Administrators" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DefaultPage />} />
              <Route path="users" element={<Users />}/>
              <Route path="users/updateUser" element={<Profile />} />
              <Route path="signUp" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/add" element={<AddCourse />} />
              <Route path="courses/update" element={<UpdateCourse />} />

              <Route path="categories" element={<Categories />} />
              <Route path="categories/add" element={<AddCategory />} />
              <Route path="categories/update" element={<UpdateCategory />} />

            </Route>
          )}
          {user.role === "Users" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DefaultPage />} />
              <Route path="users" element={<Users />}/>
              <Route path="profile" element={<Profile />} />
              <Route path="courses" element={<Courses />} />
              <Route path="categories" element={<Categories />} />
            </Route>
          )}
        </>
      )}
      <Route path="/" element={<SignIn />} />
      <Route path="/dashboard/" element={<SignIn />} />
      <Route path="/confirmEmail" element={<ConfirmEmail/>}/>
      <Route path="/resetPassword" element={<ResetPassword/>}/>
      <Route path="/sendResetEmail" element={<SendResetPasswordEmail/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;