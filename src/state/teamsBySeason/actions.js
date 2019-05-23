import createAsyncActions from '../createAsyncAction';
import { teamsBySeasonApi } from '../../Api';

const getTeamsActions = createAsyncActions(
  'TEAMS_BY_SEASON',
  async (params, dispatch, getState) => {
    const teams = await teamsBySeasonApi.get(params);

    return teams;
  },
);

export default getTeamsActions;
