const percentageTransform = (stat) => {
  return parseFloat(0 + stat);
};

const percentageTickValue = (stat) => {
  return percentageTransform(stat) * 1000;
};

export const stats = [
  {
    description: 'Home Runs',
    key: 'hr',
  },
  {
    description: 'RBIs',
    key: 'rbi',
  },
  {
    description: 'Stolen Bases',
    key: 'sb',
  },
  {
    description: 'Caught Stealing',
    key: 'cs',
  },
  {
    description: 'Hit By Pitch',
    key: 'hbp',
  },
  {
    description: 'Hits',
    key: 'h',
  },
  {
    description: 'Runs',
    key: 'r',
  },
  {
    description: 'Walks',
    key: 'bb',
  },
  {
    description: 'Games Played',
    key: 'g',
  },
  {
    description: 'Batting Average',
    key: 'avg',
    transform: percentageTransform,
    tickValue: percentageTickValue,
  },
  {
    description: 'Slugging %',
    key: 'slg',
    transform: percentageTransform,
    tickValue: percentageTickValue,
  },
  {
    description: 'On-base % + Slugging',
    key: 'ops',
    transform: percentageTransform,
    tickValue: percentageTickValue,
  },
];
