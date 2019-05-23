import createReducer from '../createReducer';
import actions from './actions';

const reducer = createReducer(
  {},
  {
    [actions.actionTypes.ROSTER_BY_SEASON_REQUEST]: (state, action) => ({
      ...state,
      [action.params.teamId]: {
        ...(state[action.params.teamId] || {}),
        [action.params.season]: {
          isFetching: true,
          results: [],
        },
      },
    }),

    [actions.actionTypes.ROSTER_BY_SEASON_RECEIVE]: (state, action) => ({
      ...state,
      [action.params.teamId]: {
        ...state[action.params.teamId],
        [action.params.season]: {
          isFetching: false,
          results: action.results.filter(
            (player) => player.primary_position !== 'P',
          ),
        },
      },
    }),
  },
);

export default reducer;
