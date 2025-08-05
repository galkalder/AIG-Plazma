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

export interface ApiResponse {
  success: boolean;
  data?: OnlineData[];
  error?: string;
} 