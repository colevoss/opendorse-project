import createAsyncAction from '../createAsyncAction';
import { playerStats } from '../../Api';

const getPlayerStats = createAsyncAction('PLAYER_STATS', async (params) => {
  const stats = await playerStats.get(params);

  return stats;
});

export default getPlayerStats;
