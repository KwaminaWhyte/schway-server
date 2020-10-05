import { combineReducers } from "redux";
import authReducer from "./authReducer";
import feedReducer from "./feedReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import commentReducer from "./commentReducer";

const rootReducer = combineReducers({
  feeds: feedReducer,
  users: userReducer,
  error: errorReducer,
  auth: authReducer,
  comments: commentReducer,
});

export default rootReducer;
