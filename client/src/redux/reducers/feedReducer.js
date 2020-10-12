const initState = {
  feeds: [],
  feed: {},
};

const feedReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_FEEDS":
      return {
        ...state,
        feeds: action.payload,
      };
    case "FETCH_FEED":
      return {
        ...state,
        feed: action.payload,
      };
    case "NEW_FEED":
      return {
        ...state,
        feed: action.payload,
      };
    case "DELETE_FEED":
      return {
        ...state,
        feeds: state.feeds.filter((feed) => feed._id !== action.payload),
      };
    case "UPDATE_FEED":
      return {
        ...state,
        feed: action.payload,
      };
    default:
      return state;
  }
};

export default feedReducer;
