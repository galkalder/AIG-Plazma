import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TeamDashboard } from './components/TeamDashboard';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useURLParams } from './hooks/useURLParams';
import { useCallCenterData } from './hooks/useCallCenterData';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
`;

const DashboardContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

function App() {
  const { teams } = useURLParams();
  const { data, loading, error, refetch } = useCallCenterData(teams);

  useEffect(() => {
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  if (loading) {
    return (
      <AppContainer>
        <LoadingSpinner />
      </AppContainer>
    );
  }

  if (error) {
    return (
      <AppContainer>
        <ErrorMessage message={error} onRetry={refetch} />
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <DashboardContainer>
        <Header teams={teams} />
        <TeamDashboard teams={data} />
      </DashboardContainer>
    </AppContainer>
  );
}

export default App; 