import * as Yup from "yup";

export const UpdateCourseSchema = Yup.object().shape({
  title: Yup.string()
    .required("Required")
    .label("Title"),
  description: Yup.string()
    .required("Required")
    .label("Description"),
  price: Yup.string()
    .required("Required")
    .label("Price"),
  categoryId: Yup.string()
    .required("Required")
    .label("Category"),
});