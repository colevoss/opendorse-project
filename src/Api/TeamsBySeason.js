import BaseApi from './BaseApi';

class TeamsBySeason extends BaseApi {
  endpoint = 'team_all_season';

  async get({ season, sortOrder = 'name_asc' }) {
    const response = await this.getRequest({
      season,
      sort_order: sortOrder,
      sport_code: 'mlb',
      all_start_sw: 'N',
    });

    return response.team_all_season.queryResults.row;
  }
}

export default new TeamsBySeason();
