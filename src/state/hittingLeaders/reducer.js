import createReducer from '../createReducer';
import { actionTypes } from './actions';
import { currentYear } from '../../utils/years';

const defaultState = {
  stat: 'avg',
  season: currentYear(),
};

const reducer = createReducer(defaultState, {
  [actionTypes.SET_SEASON]: (state, action) => ({
    ...state,
    season: action.season,
  }),

  [actionTypes.SET_STAT]: (state, action) => ({
    ...state,
    stat: action.stat,
  }),
});

export default reducer;
