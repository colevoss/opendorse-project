import React from 'react';
import styles from './Stats.module.scss';
import { Select } from '../components/Select';
import { SidebarSection } from '../components/SidebarSection';
import { useSelector, useDispatch } from 'react-redux';
import { teamsBySeasonActions } from '../state/teamsBySeason';
import { rosterBySeasonActions } from '../state/rosterBySeason';
import { statsActions } from '../state/stats';
import { playerStatsActions } from '../state/playerStats';
import { stats } from '../utils/stats';
import { SidebarChild } from '../Sidebar';
import { generateYears } from '../utils/years';

const years = generateYears();

function useTeamsBySeason(season) {
  const dispatch = useDispatch();
  const teamsBySeason = useSelector((state) => state.teamsBySeason[season]);

  React.useEffect(() => {
    dispatch(teamsBySeasonActions.fetch({ season }));
  }, [season, dispatch]);

  return teamsBySeason;
}

function useRosterBySeason(season, teamId) {
  const dispatch = useDispatch();

  const rosterForTeamAndSeason = useSelector(({ rosterBySeason }) => {
    const teamRosters = rosterBySeason[teamId] || {};

    return teamRosters[season];
  });

  React.useEffect(() => {
    if (!season || !teamId) return;
    dispatch(rosterBySeasonActions.fetch({ season, teamId }));
  }, [teamId, season, dispatch]);

  return rosterForTeamAndSeason;
}

function usePlayerStatsBySeason(season, playerId) {
  const dispatch = useDispatch();
  const playerStatsBySeason = useSelector(({ playerStats }) => {
    const statsState = playerStats[playerId];

    return statsState || {};
  });

  React.useEffect(() => {
    if (!season || !playerId) return;

    dispatch(playerStatsActions.fetch({ season, playerId }));
  }, [playerId, season, dispatch]);

  return playerStatsBySeason;
}

export default function Stats() {
  const statsState = useSelector((state) => state.stats);
  const teamsBySeason = useTeamsBySeason(statsState.season);
  const roster = useRosterBySeason(statsState.season, statsState.teamId);
  const playerStatsBySeason = usePlayerStatsBySeason(
    statsState.season,
    statsState.playerId,
  );

  const dispatch = useDispatch();

  return (
    <SidebarChild>
      <SidebarSection label="Select a stat:">
        <Select
          id="stats-stat"
          onChange={(stat) => dispatch(statsActions.setStat(stat))}
          placeholder="Stat"
          value={statsState.stat}
        >
          {stats.map((stat) => {
            return (
              <option value={stat.key} key={stat.key}>
                {stat.description}
              </option>
            );
          })}
        </Select>
      </SidebarSection>

      <SidebarSection label="Select a season:">
        <Select
          id="stats-season"
          value={statsState.season}
          placeholder="Select Year"
          onChange={(year) => dispatch(statsActions.setSeason(year))}
        >
          {years.map((year) => {
            return (
              <option key={`select-year-${year}`} value={year}>
                {year}
              </option>
            );
          })}
        </Select>
      </SidebarSection>

      {!!teamsBySeason && (
        <SidebarSection label="Select a team:">
          <Select
            id="stats-team"
            disabled={teamsBySeason.isFetching}
            value={statsState.teamId}
            placeholder={
              teamsBySeason.isFetching ? 'Loading Teams...' : 'Select Team'
            }
            onChange={(teamId) => dispatch(statsActions.setTeam(teamId))}
          >
            {teamsBySeason.results !== null &&
              teamsBySeason.results.map((team) => {
                return (
                  <option
                    key={`select-team-${team.team_id}`}
                    value={team.team_id}
                  >
                    {team.name_display_full}
                  </option>
                );
              })}
          </Select>
        </SidebarSection>
      )}

      {!!roster && (
        <SidebarSection label="Select a player:">
          <Select
            id="stats-player"
            value={statsState.playerId}
            disabled={roster.isFetching}
            placeholder={
              roster.isFetching ? 'Loading Players...' : 'Select Player'
            }
            onChange={(playerId) => {
              dispatch(statsActions.setPlayer(playerId));
            }}
          >
            {roster.results !== null &&
              roster.results.map((player) => {
                return (
                  <option
                    key={`select-player-${player.player_id}`}
                    value={player.player_id}
                  >
                    {player.name_first_last} ({player.primary_position})
                  </option>
                );
              })}
          </Select>

          {playerStatsBySeason.isFetching && (
            <div className={styles.SidebarLoadingText}>
              Loading Player Stats...
            </div>
          )}
        </SidebarSection>
      )}
    </SidebarChild>
  );
}
