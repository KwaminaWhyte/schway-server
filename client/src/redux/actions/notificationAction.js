import axios from "axios";

import { tokenConfig } from "./authAction";

export const newNotification = (body) => (dispatch) => {
  axios
    .post(`/notification/new`, body)
    .then((res) => {
      dispatch({
        type: "NEW_NOTIFICATION",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getNotifications = () => (dispatch, getState) => {
  axios
    .get("/notification", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "GET_NOTIFICATIONS",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const readNotification = (id) => (dispatch, getState) => {
  axios
    .post(`/notification/${id}/read`)
    .then((res) =>
      dispatch({
        type: "READ_NOTIFICATION",
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
