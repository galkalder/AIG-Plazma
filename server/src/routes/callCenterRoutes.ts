import { Router, Request, Response } from 'express';
import { CallCenterService } from '../services/callCenterService';

const router = Router();
const callCenterService = new CallCenterService();

// Get online data with team classification
router.get('/online-data', async (req: Request, res: Response) => {
  try {
    const { teams } = req.query;
    const teamParams = teams ? String(teams).split(',') : [];
    
    const data = await callCenterService.getOnlineDataWithClassification(teamParams);
    res.json(data);
  } catch (error) {
    console.error('Error fetching online data:', error);
    res.status(500).json({ error: 'Failed to fetch online data' });
  }
});

// Get team classification data
router.get('/team-classification', async (req: Request, res: Response) => {
  try {
    const data = await callCenterService.getTeamClassification();
    res.json(data);
  } catch (error) {
    console.error('Error fetching team classification:', error);
    res.status(500).json({ error: 'Failed to fetch team classification' });
  }
});

export { router as callCenterRoutes }; 