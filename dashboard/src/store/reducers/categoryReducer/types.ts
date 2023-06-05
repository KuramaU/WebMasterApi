export interface CategoryState {
  allCategories: any;
  loading: boolean;
  message: string;
  selectedCategory: any;
}

export enum CategoryActionType {
  START_REQUEST = "START_REQUEST",
  ALL_CATEGORIES_LOADED = "ALL_CATEGORIES_LOADED",
  FINISH_REQUEST = "FINISH_REQUEST",
}

interface StartRequestAction {
  type: CategoryActionType.START_REQUEST;
}

interface FinishRequestAction {
  type: CategoryActionType.FINISH_REQUEST;
  payload: any;
}

interface AllCategoriesLoadedAction {
  type: CategoryActionType.ALL_CATEGORIES_LOADED;
  payload: any;
}

export type CategoryActions =
  | FinishRequestAction
  | StartRequestAction
  | AllCategoriesLoadedAction;
