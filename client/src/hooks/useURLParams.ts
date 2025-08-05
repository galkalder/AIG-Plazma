import { useState, useEffect } from 'react';

export const useURLParams = () => {
  const [teams, setTeams] = useState<string[]>([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const teamsParam = urlParams.get('teams');
    
    if (teamsParam) {
      setTeams(teamsParam.split(',').map(team => team.trim()));
    }
  }, []);

  return { teams };
}; 