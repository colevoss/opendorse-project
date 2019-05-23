import createReducer from '../createReducer';
import actions from './actions';

const reducer = createReducer(
  {},
  {
    [actions.actionTypes.TEAMS_BY_SEASON_REQUEST]: (state, action) => {
      return {
        ...state,
        [action.params.season]: {
          isFetching: true,
          results: null,
        },
      };
    },

    [actions.actionTypes.TEAMS_BY_SEASON_RECEIVE]: (state, action) => {
      return {
        ...state,
        [action.params.season]: {
          isFetching: false,
          // results: action.results,
          results: action.results.filter((team) => {
            return team.all_star_sw === 'N';
          }),
        },
      };
    },
  },
);

export default reducer;
