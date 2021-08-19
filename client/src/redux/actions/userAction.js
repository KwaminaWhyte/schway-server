import axios from "axios";
import { tokenConfig } from "./authAction";

export const fetchUser = (username) => (dispatch) => {
  axios
    .get(`/user/${username}`)
    .then((res) => {
      dispatch({
        type: "FETCH_USER",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const fetchUsers = () => (dispatch, getState) => {
  axios
    .get("/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "FETCH_USERS",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
