import axios from "axios";
import { FETCH_FEEDS, NEW_FEED, DELETE_FEED } from "./types";
import { tokenConfig } from "./authAction";
import { returnError } from "./errorAction";

// import { newNotification } from "./notificationAction";

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
      dispatch(returnError(err.response.data, err.response.status));
    });
};

export const fetchUserFeeds = (id) => (dispatch, getState) => {
  axios
    .get(`/feeds/me/${id}`)
    .then((res) => {
      dispatch({
        type: "FETCH_USER_FEEDS",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data, err.response.status));
    });
};

export const fetchFeed = (id) => (dispatch) => {
  axios
    .get(`/feeds/${id}`)
    .then((res) => {
      dispatch({
        type: "FETCH_FEED",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data, err.response.status));
    });
};

export const newFeed = (data) => (dispatch, getState) => {
  let body = JSON.stringify(data);

  axios
    .post("/feeds/new/", body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: NEW_FEED,
        payload: res.data,
      });

      axios.post(
        "/notification/new/",
        {
          message: "added a new feed",
          receiver: "6158580196cbcb09bc92ab2d",
          link: `/feeds/d/${res.data._id}`,
        },
        tokenConfig(getState)
      );
    })
    .catch((err) => {
      dispatch(returnError(err.response.data, err.response.status));
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
    })
    .catch((err) => {
      dispatch(returnError(err.response.data, err.response.status));
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
      dispatch(returnError(err.response.data, err.response.status));
    });
};
