import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { teamsBySeason } from './teamsBySeason';
import { stats } from './stats';
import { rosterBySeason } from './rosterBySeason';
import { playerStats } from './playerStats';
import { hittingLeadersStats } from './hittingLeadersStats';
import { hittingLeaders } from './hittingLeaders';

const reducers = combineReducers({
  hittingLeaders,
  hittingLeadersStats,
  playerStats,
  teamsBySeason,
  rosterBySeason,
  stats,
});

const store = createStore(reducers, applyMiddleware(logger, thunk));

export default store;
