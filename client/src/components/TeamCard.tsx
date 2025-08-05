import React from 'react';
import styled from 'styled-components';
import { OnlineData } from '../types/callCenter';

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const TeamName = styled.h2`
  color: #2c3e50;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
  text-align: center;
`;

const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
`;

const Metric = styled.div`
  text-align: center;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  color: white;
`;

const MetricLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
  opacity: 0.9;
`;

const MetricValue = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const WaitTimeContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 15px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  border-radius: 10px;
  color: white;
`;

const WaitTimeLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const WaitTimeValue = styled.div`
  font-size: 28px;
  font-weight: 700;
`;

interface TeamCardProps {
  team: OnlineData;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <Card>
      <TeamName>{team.teamName}</TeamName>
      
      <WaitTimeContainer>
        <WaitTimeLabel>זמן המתנה ממוצע</WaitTimeLabel>
        <WaitTimeValue>{team.waitTime}</WaitTimeValue>
      </WaitTimeContainer>
      
      <MetricsContainer>
        <Metric>
          <MetricLabel>שיחות ממתינות</MetricLabel>
          <MetricValue>{team.pendingCalls}</MetricValue>
        </Metric>
        
        <Metric>
          <MetricLabel>סה"כ סוכנים</MetricLabel>
          <MetricValue>{team.totalAgents}</MetricValue>
        </Metric>
        
        <Metric>
          <MetricLabel>סוכנים זמינים</MetricLabel>
          <MetricValue>{team.availableAgents}</MetricValue>
        </Metric>
        
        <Metric>
          <MetricLabel>אחוז זמינות</MetricLabel>
          <MetricValue>
            {team.totalAgents > 0 
              ? Math.round((team.availableAgents / team.totalAgents) * 100)
              : 0}%
          </MetricValue>
        </Metric>
      </MetricsContainer>
    </Card>
  );
}; 