import logger from "redux-logger";
import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from "./rootReducer";
const middlewares = [reduxThunk];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;
