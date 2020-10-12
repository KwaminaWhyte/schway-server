const initState = {
  comments: [],
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
        comments: [action.payload, ...state.comments],
      };
    default:
      return state;
  }
};

export default commentReducer;
