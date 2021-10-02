import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  LOGOUT_SUCCESS,
  GO_TO_URL,
} from "./types";
import { returnError } from "./errorAction";

export const tokenConfig = (getState) => {
  // get token from local storage
  const token = getState().auth.token;
  // set headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // if token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};

// check token and load user
export const loadUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  });

  axios
    .get("/user/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnError(err.response.data, err.response.status));
    });
};

export const registerUser = (body) => (dispatch, getState) => {
  axios
    .post("/user/register/", body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnError(err.response.data, err.response.status, REGISTER_FAIL)
      );
    });
};

export const loginUser = (body) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("/user/login/", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data, err.response.status, LOGIN_FAIL));
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

export const changeURL = (data) => (dispatch) => {
  dispatch({
    type: GO_TO_URL,
    slug: data.slug,
    queryParams: data.queryParams,
  });
};

export const updateUser = (body) => (dispatch, getState) => {
  axios
    .post("/user/me/update/", body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnError(err.response.data, err.response.status, "UPDATE_FAIL")
      );
    });
};
