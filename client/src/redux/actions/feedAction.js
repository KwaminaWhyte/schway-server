import axios from "axios";
import { FETCH_FEEDS, NEW_FEED, DELETE_FEED } from "./types";
import { tokenConfig } from "./authAction";
// import { returnError } from "./errorAction";

export const fetchFeeds = () => (dispatch) => {
  axios
    .get("/feeds")
    .then((res) => {
      dispatch({
        type: FETCH_FEEDS,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnError(err.response.data, err.response.status));
      // console.log(err.response.data, err.response.status);
      console.log(err);
    });
};

export const fetchFeed = (id) => (dispatch) => {
  axios
    .get(`/feeds/${id}`)
    .then((project) => {
      dispatch({
        type: "FETCH_FEED",
        payload: project,
      });
      // console.log(project);
    })
    .catch((err) => {
      // dispatch(returnError(err.response.data, err.response.status));
      console.log(err);
    });
};

export const newFeed = (data) => (dispatch, getState) => {
  let body = JSON.stringify(data);
  console.log(body);

  axios
    .post("/feeds/new/", body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: NEW_FEED,
        payload: res.data,
      });
      // console.log(res.data);
    })
    .catch((err) => {
      // dispatch(returnError(err.response.data, err.response.status));
      console.log(err);
    });
};

export const deleteFeed = (id) => (dispatch, getState) => {
  axios
    .delete(`/feeds/${id}/delete/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_FEED,
        payload: id,
      });

      console.log(res);
    })
    .catch((err) => {
      // dispatch(returnError(err.response.data, err.response.status));
      console.log(err);
    });
};

export const updateFeed = (data, id) => (dispatch, getState) => {
  let body = JSON.stringify(data);

  axios
    .put(`/feeds/${id}/update/`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "UPDATE_FEED",
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnError(err.response.data, err.response.status));
      console.log(err);
    });
};
