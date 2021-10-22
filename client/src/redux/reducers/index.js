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
import chats from "./chat";

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
  chats,
});

export default rootReducer;
