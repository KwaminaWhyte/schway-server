import axios from "axios";

import { tokenConfig } from "./authAction";

export const newGroup = (body) => (dispatch, getState) => {
  axios
    .post(`/group/new`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "NEW_GROUP",
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => console.log(err));
};

export const getGroups = () => (dispatch, getState) => {
  axios
    .get("/group", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "GET_GROUPS",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getGroup = (id) => (dispatch, getState) => {
  axios
    .get(`/group/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "GET_GROUP",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const newChat = (id, body) => (dispatch, getState) => {
  axios
    .post(`/group_message/new/${id}`, { body }, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "NEW_BROADCAST",
        payload: res.data,
      });
      getGroup(id);
    })
    .catch((err) => console.log(err));
};
