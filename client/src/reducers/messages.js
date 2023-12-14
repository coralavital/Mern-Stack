const messagesReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_MESSAGES':
            return action.payload;
          case 'NEW_MESSAGE':
            return [...state, action.payload];
          default:
            return state;
    }
  };
  
  export default messagesReducer;
  