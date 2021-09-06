import axios from "axios";
import {} from "./types";

import { tokenConfig } from "./authAction";

export const fetchComments = (id) => (dispatch) => {
  axios
    .get(`/comment/feed/${id}`)
    .then((res) => {
      dispatch({
        type: "FETCH_COMMENTS",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const newComment = (data) => (dispatch, getState) => {
  let body = JSON.stringify(data);

  axios
    .post("/comment/new", body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: "NEW_COMMENT",
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
