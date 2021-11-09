import { combineReducers } from "redux";
import catalogReducer from "./catalogReducers";
import productReducers from "./productReducers";

const rootReducer = combineReducers({
  catalog: catalogReducer,
  product: productReducers,
});
export default rootReducer;
