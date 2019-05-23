import createReducer from '../createReducer';
import { actionTypes } from './actions';
import { currentYear } from '../../utils/years';

const defaultState = {
  playerId: null,
  season: currentYear(),
  teamId: null,
  stat: 'avg',
};

const reducer = createReducer(defaultState, {
  [actionTypes.SET_STAT]: (state, action) => ({
    ...state,
    stat: action.stat,
  }),

  [actionTypes.SET_PLAYER]: (state, action) => ({
    ...state,
    playerId: action.playerId,
  }),

  [actionTypes.SET_TEAM]: (state, action) => ({
    ...state,
    teamId: action.teamId,
    playerId: null,
  }),

  [actionTypes.SET_SEASON]: (state, action) => ({
    ...defaultState,
    stat: state.stat,
    season: action.season,
  }),
});

export default reducer;
