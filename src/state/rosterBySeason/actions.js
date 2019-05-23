import createAsyncAction from '../createAsyncAction';
import { rosterBySeasonApi } from '../../Api';

const getRosterActions = createAsyncAction(
  'ROSTER_BY_SEASON',
  async (params) => {
    const roster = await rosterBySeasonApi.get(params);

    return roster;
  },
);

export default getRosterActions;
