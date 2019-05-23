import createReducer from '../createReducer';
import actions from './actions';

const reducer = createReducer(
  {},
  {
    [actions.actionTypes.HITTING_LEADERS_REQUEST]: (state, action) => ({
      ...state,
      [action.params.season]: {
        ...(state[action.params.season] || {}),
        [action.params.sortColumn]: {
          isFetching: true,
          results: [],
        },
      },
    }),

    [actions.actionTypes.HITTING_LEADERS_RECEIVE]: (state, action) => ({
      ...state,
      [action.params.season]: {
        ...state[action.params.season],
        [action.params.sortColumn]: {
          isFetching: false,
          results: action.results,
        },
      },
    }),
  },
);

export default reducer;
