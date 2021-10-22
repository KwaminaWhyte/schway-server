const initState = {
  notifications: [],
  notification: {},
};

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
      };
    case "NEW_NOTIFICATION":
      return {
        ...state,
        notification: action.payload,
      };
    case "READ_NOTIFICATION":
      return {
        ...state,
        notification: action.payload,
      };
    default:
      return state;
  }
};

export default notificationReducer;
