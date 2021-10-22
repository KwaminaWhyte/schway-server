import axios from "axios";
import { io } from "socket.io-client";

import { tokenConfig } from "./authAction";
const socket = io();

export const getConversation = (id) => (dispatch, getState) => {
  axios
    .get(`/conversation/current/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "GET_CONVERSATION",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const newConversation = (id) => (dispatch, getState) => {
  axios
    .patch(`/conversation/msg/new`, { user2: id }, tokenConfig(getState))
    .then((res) => {
      socket.emit("chat", res.data);

      socket.on("receive-chat", (data) => {
        console.log(data);

        dispatch({
          type: "NEW_MESSAGE",
          payload: data,
        });
      });
    })
    .catch((err) => console.log(err));
};

export const newMessage = (body, id) => (dispatch, getState) => {
  axios
    .post(`/message/new/${id}`, body, tokenConfig(getState))
    .then((res) => {
      socket.emit("chat", res.data);
    })
    .then(() => {
      socket.on("receive-chat", (data) => {
        console.log(data);

        dispatch({
          type: "NEW_MESSAGE",
          payload: data,
        });
      });
    })
    .catch((err) => console.log(err));
};
