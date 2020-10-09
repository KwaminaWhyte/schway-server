import axios from "axios";

export const fetchUser = () => (dispatch) => {
  axios
    .get(`/user`)
    .then((res) => {
      dispatch({
        type: "FETCH_USERS",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
