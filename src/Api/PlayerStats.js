import BaseApi from './BaseApi';

class PlayerStats extends BaseApi {
  endpoint = 'sport_hitting_tm';

  async get({ season, playerId }) {
    const response = await this.getRequest({
      player_id: playerId,
      game_type: 'R',
      league_list_id: 'mlb',
    });

    return response.sport_hitting_tm.queryResults.row;
  }
}

export default new PlayerStats();
