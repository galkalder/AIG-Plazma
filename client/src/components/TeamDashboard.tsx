import React from 'react';
import styled from 'styled-components';
import { TeamCard } from './TeamCard';
import { OnlineData } from '../types/callCenter';

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: white;
  font-size: 18px;
`;

interface TeamDashboardProps {
  teams: OnlineData[];
}

export const TeamDashboard: React.FC<TeamDashboardProps> = ({ teams }) => {
  if (!teams || teams.length === 0) {
    return (
      <EmptyState>
        לא נמצאו נתונים לצוותים המבוקשים
      </EmptyState>
    );
  }

  return (
    <DashboardGrid>
      {teams.map((team) => (
        <TeamCard key={team.userTeamCode} team={team} />
      ))}
    </DashboardGrid>
  );
}; 