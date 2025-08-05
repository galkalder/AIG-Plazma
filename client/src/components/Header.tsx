import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: white;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  margin-bottom: 20px;
`;

const TeamsInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 15px 25px;
  display: inline-block;
  color: white;
  font-size: 16px;
`;

interface HeaderProps {
  teams: string[];
}

export const Header: React.FC<HeaderProps> = ({ teams }) => {
  const teamsText = teams.length > 0 
    ? `צוותים מוצגים: ${teams.join(', ')}`
    : 'כל הצוותים מוצגים';

  return (
    <HeaderContainer>
      <Title>Plazma Dashboard</Title>
      <Subtitle>לוח בקרת מרכז שירות</Subtitle>
      <TeamsInfo>{teamsText}</TeamsInfo>
    </HeaderContainer>
  );
}; 