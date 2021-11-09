import * as types from "./actionTypes";

const initialState = {
  listProduct: [],
  loading: false,
};

const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCT:
      return {
        ...state,
        listProduct: action.payload,
        loading: false,
      };
    case types.CREATE_PRODUCT:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default productReducers;
