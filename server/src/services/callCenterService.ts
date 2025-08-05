import sql from 'mssql';
import { DatabaseConfig } from '../config/database';

export interface OnlineData {
  userTeamCode: string;
  teamName: string;
  waitTime: string;
  pendingCalls: number;
  totalAgents: number;
  availableAgents: number;
}

export interface TeamClassification {
  userTeamCode: string;
  teamName: string;
  vdnInfo: any;
  callCenterInfo: any;
}

export class CallCenterService {
  private rtdbConfig: sql.config;
  private edwdbConfig: sql.config;

  constructor() {
    this.rtdbConfig = {
      server: 'CCASQLIS',
      database: 'IVI_GENESYSCLD_RT',
      options: {
        encrypt: false,
        trustServerCertificate: true
      }
    };

    this.edwdbConfig = {
      server: 'ISLPDWH01',
      database: 'AIG_EDW',
      options: {
        encrypt: false,
        trustServerCertificate: true
      }
    };
  }

  async getOnlineDataWithClassification(teamParams: string[]): Promise<OnlineData[]> {
    try {
      // Get online data from RT database
      const onlineData = await this.getOnlineData();
      
      // Get team classification from EDW database
      const teamClassification = await this.getTeamClassification();
      
      // Merge and filter data based on URL parameters
      const mergedData = this.mergeData(onlineData, teamClassification, teamParams);
      
      return mergedData;
    } catch (error) {
      console.error('Error in getOnlineDataWithClassification:', error);
      throw error;
    }
  }

  private async getOnlineData(): Promise<any[]> {
    try {
      const pool = await sql.connect(this.rtdbConfig);
      const result = await pool.request()
        .execute('AIGGETONLINEDATA');
      
      await pool.close();
      return result.recordset;
    } catch (error) {
      console.error('Error fetching online data:', error);
      throw error;
    }
  }

  async getTeamClassification(): Promise<TeamClassification[]> {
    try {
      const pool = await sql.connect(this.edwdbConfig);
      
      // Query DIM_VDN_PLZ view
      const vdnResult = await pool.request()
        .query('SELECT * FROM DIM_VDN_PLZ');
      
      // Query TIM_CALLCENTERS_V view
      const callCenterResult = await pool.request()
        .query('SELECT * FROM TIM_CALLCENTERS_V');
      
      await pool.close();
      
      // Merge data based on USERTEAMCODE
      return this.mergeTeamClassification(vdnResult.recordset, callCenterResult.recordset);
    } catch (error) {
      console.error('Error fetching team classification:', error);
      throw error;
    }
  }

  private mergeTeamClassification(vdnData: any[], callCenterData: any[]): TeamClassification[] {
    const merged: TeamClassification[] = [];
    
    for (const vdn of vdnData) {
      const callCenter = callCenterData.find(cc => cc.USERTEAMCODE === vdn.USERTEAMCODE);
      
      merged.push({
        userTeamCode: vdn.USERTEAMCODE,
        teamName: vdn.TEAM_NAME || callCenter?.TEAM_NAME || 'Unknown Team',
        vdnInfo: vdn,
        callCenterInfo: callCenter
      });
    }
    
    return merged;
  }

  private mergeData(onlineData: any[], teamClassification: TeamClassification[], teamParams: string[]): OnlineData[] {
    const merged: OnlineData[] = [];
    
    for (const online of onlineData) {
      const classification = teamClassification.find(tc => tc.userTeamCode === online.USERTEAMCODE);
      
      // Filter by team parameters if provided
      if (teamParams.length > 0 && !teamParams.includes(online.USERTEAMCODE)) {
        continue;
      }
      
      merged.push({
        userTeamCode: online.USERTEAMCODE,
        teamName: classification?.teamName || 'Unknown Team',
        waitTime: online.WAIT_TIME || '0:00',
        pendingCalls: online.PENDING_CALLS || 0,
        totalAgents: online.TOTAL_AGENTS || 0,
        availableAgents: online.AVAILABLE_AGENTS || 0
      });
    }
    
    return merged;
  }
} 