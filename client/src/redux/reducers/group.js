const initState = {
  groups: [],
  group: {},
  chats: [],
};

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case "NEW_GROUP":
      return {
        ...state,
        group: action.payload,
      };
    case "NEW_BROADCAST":
      return {
        ...state,
        chats: [...state.chats, action.payload],
      };
    case "GET_GROUPS":
      return {
        ...state,
        groups: action.payload,
      };
    case "GET_GROUP":
      return {
        ...state,
        group: action.payload.group,
        chats: action.payload.chats,
      };
    default:
      return state;
  }
};

export default notificationReducer;
