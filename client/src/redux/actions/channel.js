import axios from "axios";

import { tokenConfig } from "./authAction";

export const newChannel = (body) => (dispatch, getState) => {
  axios
    .post(`/channel/new`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "NEW_CHANNEL",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getChannels = () => (dispatch, getState) => {
  axios
    .get("/channel", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "GET_CHANNELS",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getChannel = (id) => (dispatch, getState) => {
  axios
    .get(`/channel/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "GET_CHANNEL",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const newBroadcast = (id, body) => (dispatch, getState) => {
  axios
    .post(`/broadcast/new/${id}`, { body }, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "NEW_BROADCAST",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
