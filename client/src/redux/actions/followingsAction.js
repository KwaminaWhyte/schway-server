import axios from "axios";
import { tokenConfig } from "./authAction";
import { returnError } from "./errorAction";

// import { newNotification } from "./notificationAction";

export const follow = (userId) => (dispatch, getState) => {
  axios
    .post("/followings/follow", userId, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "FOLLOW",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data, err.response.status));
    });
};

export const unfollow = (userId) => (dispatch, getState) => {
  axios
    .post("/followings/unfollow", userId, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "UNFOLLOW",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data, err.response.status));
    });
};
