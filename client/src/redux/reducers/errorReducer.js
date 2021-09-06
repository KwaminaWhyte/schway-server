import { GET_ERROR, CLEAR_ERROR } from "../actions/types";

const initState = {
  msg: null,
  status: null,
};

const errorReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ERROR:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERROR:
      return {
        msg: null,
        status: null,
        id: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
