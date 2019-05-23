import React from 'react';
import styles from './Stats.module.scss';
import { Main } from '../components/Main';
import { format } from 'd3-format';
import useSize from '../utils/useSize';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';
import { useSelector } from 'react-redux';
import Line from './Line';
import StatCircle from './StatCircle';
import { stats as statTypes } from '../utils/stats';

const margin = { top: 32, right: 32, bottom: 32, left: 32 };

const getYear = (season) => {
  return Number(season.season);
};

const getStat = (statType, stat) => {
  const transform = statType.transform || Number;

  return transform(stat[statType.key]);
};

const getStats = (statType, stats = []) => {
  return stats.map((stat) => {
    return getStat(statType, stat);
  });
};

const useXScale = (years, width = 0) => {
  return React.useMemo(
    () =>
      scaleLinear()
        .domain([min(years), max(years)])
        .range([0, width - margin.left - margin.right]),
    [width, years],
  );
};

const useYScale = (data, height = 0) => {
  return React.useMemo(
    () =>
      scaleLinear()
        .domain([0, max(data)])
        .range([height - margin.top - margin.bottom, 0]),
    [height, data],
  );
};

const usePlayerStats = () => {
  return useSelector(({ stats, playerStats }) => {
    const { playerId } = stats;

    const statsState = playerStats[playerId];

    return statsState || {};
  });
};

export default function Stats() {
  const ref = React.useRef();
  const svgRef = React.useRef();
  const groupRef = React.useRef();

  const { height, width } = useSize(ref);
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const { playerId, stat } = useSelector(({ stats: statState }) => statState);
  const playerStats = usePlayerStats();
  const playerStatsResults = !!playerStats.results ? playerStats.results : [];

  const statType = statTypes.find((s) => s.key === stat);

  const years = playerStatsResults.map(getYear);
  const stats = getStats(statType, playerStatsResults || []);

  const xScale = useXScale(years, innerWidth);
  const xAxis = axisBottom().scale(xScale);

  xAxis.tickValues(years).tickFormat(format(''));

  const yScale = useYScale(stats, innerHeight);
  const yAxis = axisLeft().scale(yScale);

  React.useEffect(() => {
    if (!playerId) return;

    const xAxisSvg = select(groupRef.current)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${innerHeight})`)
      .call(xAxis);

    const yAxisSvg = select(groupRef.current)
      .append('g')
      .attr(
        'transform',
        `translate(${margin.left}, ${margin.top + margin.bottom})`,
      )
      .call(yAxis);

    return () => {
      xAxisSvg.remove();
      yAxisSvg.remove();
    };
  }, [
    innerHeight,
    width,
    xAxis,
    yAxis,
    groupRef,
    playerId,
    playerStats.isFetching,
    statType,
  ]);

  const [showDescriptions, setShowDescriptions] = React.useState(true);

  return (
    <Main>
      <div ref={ref} style={{ flex: 1 }}>
        {!playerId && (
          <div className={styles.EmptyState}>
            <h3 className={styles.EmptyStateText}>
              Select a season, team, and player to see stats
            </h3>
          </div>
        )}
        <svg ref={svgRef} style={{ height: '100%', width: '100%' }}>
          <g
            ref={groupRef}
            transform={`translate(${margin.top}, ${margin.left})`}
          >
            {playerId && !playerStats.isFetching && (
              <g
                transform={`translate(${margin.top}, ${margin.left +
                  margin.right})`}
              >
                <Line
                  data={playerStatsResults}
                  x={(d) => xScale(getYear(d))}
                  y={(d) => yScale(getStat(statType, d))}
                />
                <g>
                  {playerStatsResults.map((s) => {
                    return (
                      <StatCircle
                        key={`${s.player_id}-${s.season}-${statType.key}`}
                        showDescription={showDescriptions}
                        onClick={() => {
                          setShowDescriptions(!showDescriptions);
                        }}
                        data={s}
                        x={(d) => xScale(getYear(d))}
                        y={(d) => yScale(getStat(statType, d))}
                        description={(data) => getStat(statType, data)}
                      />
                    );
                  })}
                </g>
              </g>
            )}
          </g>
        </svg>
      </div>
    </Main>
  );
}
