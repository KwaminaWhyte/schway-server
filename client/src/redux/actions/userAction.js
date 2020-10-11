import axios from "axios";

export const fetchUser = (username) => (dispatch) => {
  axios
    .get(`/user/${username}`)
    .then((res) => {
      dispatch({
        type: "FETCH_USER",
        payload: res.data,
      });

      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

export const fetchUsers = () => (dispatch) => {
  axios
    .get(`/user`)
    .then((res) => {
      dispatch({
        type: "FETCH_USERS",
        payload: res.data,
      });

      console.log(res.data);
    })
    .catch((err) => console.log(err));
};
