const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_USERS':
      return action.payload;
    case 'UPDATE_USER':
      return state.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    case 'DELETE_USER':
      return state.filter((user) => user._id !== action.payload);
    default:
      return state;
  }
};

export default usersReducer;
