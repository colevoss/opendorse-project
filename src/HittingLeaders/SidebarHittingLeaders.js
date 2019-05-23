import React from 'react';
import styles from './HittingLeaders.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { SidebarChild } from '../Sidebar';
import { SidebarSection } from '../components/SidebarSection';
import { Select } from '../components/Select';
import { generateYears } from '../utils/years';
import { hittingLeadersActions } from '../state/hittingLeaders';
import { hittingLeadersStatsActions } from '../state/hittingLeadersStats';
import { stats } from '../utils/stats';

const years = generateYears();

function useHittingLeaders() {
  return useSelector(({ hittingLeaders }) => hittingLeaders);
}

function useHittingLeadersStats(season, stat) {
  const dispatch = useDispatch();
  const hittingLeadersStats = useSelector(
    ({ hittingLeaders, hittingLeadersStats }) => {
      const statsBySeason = hittingLeadersStats[hittingLeaders.season] || {};

      return statsBySeason[hittingLeaders.stat];
    },
  );

  React.useEffect(() => {
    dispatch(hittingLeadersStatsActions.fetch({ season, sortColumn: stat }));
  }, [season, stat, dispatch]);

  return hittingLeadersStats;
}

export default function SidebarHittingLeaders() {
  const hittingLeadersState = useHittingLeaders();
  const hittingLeaderStats = useHittingLeadersStats(
    hittingLeadersState.season,
    hittingLeadersState.stat,
  );
  const dispatch = useDispatch();

  return (
    <SidebarChild>
      <SidebarSection label="Select a stat:">
        <Select
          id="hitting-leader-stat"
          value={hittingLeadersState.stat}
          placeholder="Select Stat"
          onChange={(stat) => {
            dispatch(hittingLeadersActions.setStat(stat));
          }}
        >
          {stats.map((statType) => {
            return (
              <option
                key={`select-hitting-leader-stat-${statType.key}`}
                value={statType.key}
              >
                {statType.description}
              </option>
            );
          })}
        </Select>
      </SidebarSection>

      <SidebarSection label="Select a season:">
        <Select
          id="hitting-leader-season"
          value={hittingLeadersState.season}
          placeholder="Select Season"
          onChange={(year) => {
            dispatch(hittingLeadersActions.setSeason(year));
          }}
        >
          {years.map((year) => {
            return (
              <option key={`select-hitting-leader-season-${year}`} value={year}>
                {year}
              </option>
            );
          })}
        </Select>
      </SidebarSection>

      {hittingLeaderStats && hittingLeaderStats.isFetching && (
        <div className={styles.SidebarLoadingText}>Loading Player Stats...</div>
      )}
    </SidebarChild>
  );
}
