import createReducer from '../createReducer';
import actions from './actions';

const reducer = createReducer(
  {},
  {
    [actions.actionTypes.PLAYER_STATS_REQUEST]: (state, action) => ({
      ...state,
      [action.params.playerId]: {
        isFetching: true,
        results: null,
      },
    }),

    [actions.actionTypes.PLAYER_STATS_RECEIVE]: (state, action) => {
      return {
        ...state,
        [action.params.playerId]: {
          isFetching: false,
          results: action.results,
        },
      };
    },
  },
);

export default reducer;
