import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
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
      dispatch(returnError(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });

      console.log(err.response.data, err.response.status);
    });
};

export const registerUser = (data) => (dispatch, getState) => {
  const body = JSON.stringify(data);

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
      dispatch({
        type: REGISTER_FAIL,
      });
      console.log(err.response.data, err.response.status);
    });
};

export const loginUser = (data) => (dispatch) => {
  let body = JSON.stringify(data);

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
      dispatch({
        type: LOGIN_FAIL,
      });
      console.log(err.response.data, err.response.status);
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
