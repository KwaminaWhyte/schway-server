const initState = {
  channels: [],
  channel: {},
  broadcasts: [],
};

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case "NEW_CHANNEL":
      return {
        ...state,
        channel: action.payload,
      };
    case "NEW_BROADCAST":
      return {
        ...state,
        broadcasts: [...state.broadcasts, action.payload],
      };
    case "GET_CHANNELS":
      return {
        ...state,
        channels: action.payload,
      };
    case "GET_CHANNEL":
      return {
        ...state,
        channel: action.payload.channel,
        broadcasts: action.payload.broadcasts,
      };
    default:
      return state;
  }
};

export default notificationReducer;
