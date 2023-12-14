const conversationsReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_CONVERSATIONS':
      return action.payload;
    case 'NEW_CONVERSATION':
      return [...state, action.payload];
    case 'DELETE_CONVERSATION':
      return state.filter((conversation) => conversation._id !== action.payload);
    default:
      return state;
  }
};

export default conversationsReducer;
