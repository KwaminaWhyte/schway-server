// import { LOGIN_SUCCESS } from "../actions/types";

const initState = {
  users: [],
  user: {},
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "FETCH_USERS":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
