import createAsyncAction from '../createAsyncAction';
import { hittingLeadersApi } from '../../Api';

const getHittingLeadersActions = createAsyncAction(
  'HITTING_LEADERS',
  async (params) => {
    const roster = await hittingLeadersApi.get(params);

    return roster;
  },
);

export default getHittingLeadersActions;
