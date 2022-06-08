import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import AdminReducer from "./adminReducer";
import AuthReducer from "./authReducer";
import MainReducer from "./MainReducer";

let reducers = combineReducers({
  auth: AuthReducer,
  admin: AdminReducer,
  main: MainReducer,
});

// ДЛЯ РАСШИРЕНИЯ В ХРОМЕ
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;
//////////

let store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
