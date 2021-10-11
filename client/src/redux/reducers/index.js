import { combineReducers } from "redux";
import authReducer from "./authReducer";
import feeds from "./feedReducer";
import user from "./userReducer";
import errorReducer from "./errorReducer";
import commentReducer from "./commentReducer";
import notificationReducer from "./notificationReducer";
import followings from "./followings";
import channels from "./channel";
import groups from "./group";

const rootReducer = combineReducers({
  feeds,
  user,
  error: errorReducer,
  auth: authReducer,
  comments: commentReducer,
  notifications: notificationReducer,
  followings,
  channels,
  groups,
});

export default rootReducer;
