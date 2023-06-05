import * as Yup from "yup";

const passwordRegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$/;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address.")
    .required("Required")
    .label("Email address"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Required")
    .matches(
      passwordRegExp,
      "Password must contains A-Z, a-z, 0-9 and special charaters."
    )
    .label("Password"),
});

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Required")
    .label("First name"),
  lastName: Yup.string()
    .required("Required")
    .label("Last name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Required")
    .label("Email address"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required")
    .matches(
      passwordRegExp,
      "Password must contains A-Z, a-z, 0-9 and special charaters."
    )
    .label("Password"),
  confirmPassword: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Required")
    .matches(
      passwordRegExp,
      "Password must contains A-Z, a-z, 0-9 and special charaters."
    )
    .label("Confirm password"),
});


export const UpdateProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Required")
    .label("First name"),
  lastName: Yup.string()
    .required("Required")
    .label("Last name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Required")
    .label("Email address"),
  phoneNumber: Yup.string()
  .matches(phoneRegExp, "Phone number is not valid")
  .required("Required")
  .label("Phone Number")
});

export const UpdatePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required")
    .matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9 and special charaters.")
    .label("Current password"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Required")
    .matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9 and special charaters.")
    .label("New password"),
  confirmNewPassword: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Required")
    .matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9 and special charaters.")
    .label("Confirm new password"),
});