const createReducer = (initialState, reducers = {}) => (
  state = initialState,
  action = {},
) => {
  if (reducers.hasOwnProperty(action.type)) {
    return reducers[action.type](state, action);
  }

  return state;
};

export default createReducer;
