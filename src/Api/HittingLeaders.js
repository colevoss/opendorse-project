import BaseApi from './BaseApi';

class HittingLeaders extends BaseApi {
  endpoint = 'leader_hitting_repeater';

  async get({ season, count = 10, gameType = 'R', sortColumn }) {
    const response = await this.getRequest(
      {
        season,
        results: count,
        game_type: gameType,
        sort_column: sortColumn,
        'leader_hitting_repeater.col_in': [
          sortColumn,
          'name_display_first_last',
          'player_id',
        ].join(),
      },
      ['leader_hitting_repeater.col_in'],
    );

    return response.leader_hitting_repeater.leader_hitting_mux.queryResults.row;
  }
}

export default new HittingLeaders();
