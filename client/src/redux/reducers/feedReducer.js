const initState = {
  feeds: [],
  userFeeds: [],
  feed: {},
  comments: [],
};

const feedReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_FEEDS":
      return {
        ...state,
        feeds: action.payload,
      };
    case "FETCH_USER_FEEDS":
      return {
        ...state,
        userFeeds: action.payload,
      };
    case "FETCH_FEED":
      return {
        ...state,
        feed: action.payload.feed,
        comments: action.payload.comments,
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
