export interface DatabaseConfig {
  server: string;
  database: string;
  user?: string;
  password?: string;
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
  };
}

export const RT_DB_CONFIG: DatabaseConfig = {
  server: 'CCASQLIS',
  database: 'IVI_GENESYSCLD_RT',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

export const EDW_DB_CONFIG: DatabaseConfig = {
  server: 'ISLPDWH01',
  database: 'AIG_EDW',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
}; 