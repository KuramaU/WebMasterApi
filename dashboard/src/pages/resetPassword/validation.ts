import * as Yup from "yup";

const passwordRegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$/;

export const ResetPasswordSchema = Yup.object().shape({
    currentPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required")
    .matches(
      passwordRegExp,
      "Password must contains A-Z, a-z, 0-9 and special charaters."
    )
    .label("Password"),
    newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required")
    .matches(
      passwordRegExp,
      "Password must contains A-Z, a-z, 0-9 and special charaters."
    )
    .label("Password"),
  confirmNewPassword: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Required")
    .matches(
      passwordRegExp,
      "Password must contains A-Z, a-z, 0-9 and special charaters."
    )
    .label("Confirm password"),
});

export const SendResetEmailSchema = Yup.object().shape({
    email: Yup.string()
    .email("Invalid email address.")
    .required("Required")
    .label("Email address"),
});