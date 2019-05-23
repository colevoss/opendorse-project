import React from 'react';
import { Main } from '../components/Main';
import useSize from '../utils/useSize';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { stats as statTypes } from '../utils/stats';
import { useSelector } from 'react-redux';
import Bar from './Bar';

const margin = { top: 32, right: 32, bottom: 32, left: 32 };

const getStat = (statType, stat) => {
  const transform = statType.transform || Number;

  return transform(stat[statType.key]);
};

const getStats = (statType, stats = []) => {
  return stats.map((stat) => {
    return getStat(statType, stat);
  });
};

function useXScale(stats, width = 0) {
  return React.useMemo(() => {
    return scaleBand()
      .range([0, width - margin.left - margin.right])
      .padding(0.4)
      .domain(stats.map((stat) => stat.name_display_first_last));
  }, [stats, width]);
}

function useYScale(stats, height = 0) {
  return React.useMemo(() => {
    return scaleLinear()
      .domain([0, max(stats)])
      .range([height - margin.top - margin.bottom, 0]);
  }, [stats, height]);
}

function useStatType() {
  const statKey = useSelector(({ hittingLeaders }) => hittingLeaders.stat);

  return statTypes.find((stat) => stat.key === statKey);
}

function useStats() {
  return useSelector(({ hittingLeaders, hittingLeadersStats }) => {
    const statsBySeason = hittingLeadersStats[hittingLeaders.season] || {};

    return statsBySeason[hittingLeaders.stat];
  });
}

export default function HittingLeaders() {
  const ref = React.useRef();
  const svgRef = React.useRef();
  const groupRef = React.useRef();

  const { height, width } = useSize(ref);
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const statType = useStatType();
  const seasonStats = useStats();
  const statsData = seasonStats ? seasonStats.results : [];
  const stats = getStats(statType, statsData);

  const xScale = useXScale(statsData, innerWidth);
  const xAxis = axisBottom().scale(xScale);

  const yScale = useYScale(stats, innerHeight);
  const yAxis = axisLeft().scale(yScale);

  React.useEffect(() => {
    if (!statsData) return;

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
  }, [innerHeight, statsData, groupRef, xAxis, yAxis]);

  const [showDescription, setShowDescription] = React.useState(true);

  return (
    <Main>
      <div ref={ref} style={{ flex: 1 }}>
        <svg ref={svgRef} style={{ height: '100%', width: '100%' }}>
          <g
            ref={groupRef}
            transform={`translate(${margin.top}, ${margin.left})`}
          >
            {statsData.map((stat) => {
              return (
                <Bar
                  key={`${statType.key}-${stat.player_id}`}
                  data={stat}
                  showDescription={showDescription}
                  onClick={() => setShowDescription(!showDescription)}
                  x={() => xScale(stat.name_display_first_last)}
                  y={() =>
                    yScale(getStat(statType, stat)) + margin.bottom + margin.top
                  }
                  width={() => xScale.bandwidth()}
                  height={() =>
                    innerHeight -
                    margin.top -
                    margin.bottom -
                    yScale(getStat(statType, stat))
                  }
                  description={() => getStat(statType, stat)}
                />
              );
            })}
          </g>
        </svg>
      </div>
    </Main>
  );
}
