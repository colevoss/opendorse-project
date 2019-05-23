export const actionTypes = {
  SET_SEASON: 'SET_SEASON',
  SET_TEAM: 'SET_TEAM',
  SET_PLAYER: 'SET_PLAYER',
  SET_STAT: 'SET_STAT',
};

export const setSeason = (season) => ({
  type: actionTypes.SET_SEASON,
  season,
});

export const setTeam = (teamId) => ({
  type: actionTypes.SET_TEAM,
  teamId,
});

export const setPlayer = (playerId) => ({
  type: actionTypes.SET_PLAYER,
  playerId,
});

export const setStat = (stat) => ({
  type: actionTypes.SET_STAT,
  stat,
});
