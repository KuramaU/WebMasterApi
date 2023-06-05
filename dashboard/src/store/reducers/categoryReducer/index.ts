import {
  CategoryState,
  CategoryActionType,
  CategoryActions,
} from "./types";

const initialState: CategoryState = {
  allCategories: [],
  loading: false,
  message: "",
  selectedCategory: null,
};
const CategoriesReducer = (
  state = initialState,
  action: CategoryActions
): CategoryState => {
  console.log("CategoryState ", action);
  switch (action.type) {
    case CategoryActionType.START_REQUEST:
      return { ...state, loading: true };
    case CategoryActionType.ALL_CATEGORIES_LOADED:
      return { ...state, loading: false, allCategories: action.payload };
    case CategoryActionType.FINISH_REQUEST:
      return { ...state, loading: false, message: action.payload };

    default:
      return state;
  }
};
export default CategoriesReducer;
