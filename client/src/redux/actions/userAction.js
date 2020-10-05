import axios from "axios";

// import {  } from "./types";

export const fetchUser = () => (dispatch) => {
  axios
    .get(`/user`)
    .then((res) => {
      dispatch({
        type: "FETCH_USERS",
        payload: res.data,
      });

      console.log(res.data);
      // return res.data.map((user) => console.log(user.username));
    })
    .catch((err) => console.log(err));
};
