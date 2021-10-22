import axios from "axios";

import { tokenConfig } from "./authAction";
import { returnError } from "./errorAction";

export const fetchComments = (id) => (dispatch) => {
  axios
    .get(`/comment/feed/${id}`)
    .then((res) => {
      dispatch({
        type: "FETCH_COMMENTS",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnError(err.response.data, err.response.status, "FAIL_COMMENTS")
      );
    });
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
    .catch((err) => {
      dispatch(
        returnError(err.response.data, err.response.status, "FAIL_COMMENT")
      );
    });
};
