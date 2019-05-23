import BaseApi from './BaseApi';

class RosterBySeason extends BaseApi {
  endpoint = 'roster_team_alltime';

  async get({ season, teamId }) {
    const response = await this.getRequest({
      start_season: season,
      end_season: season,
      team_id: teamId,
    });

    return response.roster_team_alltime.queryResults.row;
  }
}

export default new RosterBySeason();
