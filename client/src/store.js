import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

const initialState = {};

const middleware = [thunk];
const enhancers = [applyMiddleware(...middleware)];

const store = createStore(reducers, initialState, compose(...enhancers));

export default store;
