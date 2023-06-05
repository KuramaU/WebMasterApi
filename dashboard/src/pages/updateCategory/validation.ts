import * as Yup from "yup";

export const UpdateCategorySchema = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .label("Title"),
});