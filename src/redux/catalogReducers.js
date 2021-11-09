import * as types from "./actionTypes";

const initialState = {
  listCatalog: [],
  loading: false,
};

const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CATA:
      return {
        ...state,
        listCatalog: action.payload,
        loading: false,
      };
    case types.ADD_CATA:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default catalogReducer;
