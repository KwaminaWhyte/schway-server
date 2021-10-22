const initState = {
  user: {},
};

const followingsReducer = (state = initState, action) => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        user: action.payload,
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default followingsReducer;
