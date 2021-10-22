const initState = {
  conversation: {},
  messages: [],
};

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_CONVERSATION":
      return {
        ...state,
        conversation: action.payload.conversation,
        messages: action.payload.messages,
      };
    case "NEW_MESSAGE":
      console.log(action.payload);
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

export default notificationReducer;
