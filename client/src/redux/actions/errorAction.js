import { GET_ERROR, CLEAR_ERROR } from "./types";

export const returnError =
  (msg, status, id = null) =>
  (dispatch) => {
    dispatch({
      type: GET_ERROR,
      payload: { msg, status, id },
    });
  };

export const clearError =
  (msg, status, id = null) =>
  (dispatch) => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };
