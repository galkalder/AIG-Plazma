import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { OnlineData } from '../types/callCenter';

interface UseCallCenterDataReturn {
  data: OnlineData[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCallCenterData = (teams: string[]): UseCallCenterDataReturn => {
  const [data, setData] = useState<OnlineData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = teams.length > 0 ? { teams: teams.join(',') } : {};
      const response = await axios.get('/api/callcenter/online-data', { params });
      
      setData(response.data);
    } catch (err) {
      console.error('Error fetching call center data:', err);
      setError('שגיאה בטעינת הנתונים. אנא נסה שוב.');
    } finally {
      setLoading(false);
    }
  }, [teams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}; 