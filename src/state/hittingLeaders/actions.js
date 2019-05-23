export const actionTypes = {
  SET_STAT: 'SET_STAT',
  SET_RESULT_COUNT: 'SET_RESULT_COUNT',
  SET_SEASON: 'SET_SEASON',
};

export const setStat = (stat) => ({
  type: actionTypes.SET_STAT,
  stat,
});

export const setSeason = (season) => ({
  type: actionTypes.SET_SEASON,
  season,
});
