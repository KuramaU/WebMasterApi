import * as Yup from "yup";

export const AddCategorySchema = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .label("Name"),
});