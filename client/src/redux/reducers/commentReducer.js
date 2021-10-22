const initState = {
  comments: [],
  comment: {},
};

const commentReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };
    case "NEW_COMMENT":
      return {
        ...state,
        comment: action.payload,
      };
    case "FAIL_COMMENTS":
    case "FAIL_COMMENT":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default commentReducer;
