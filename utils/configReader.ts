export type EnvironmentName = 'qa' | 'dev' | 'app';

const urls: Record<EnvironmentName, string> = {
  qa: process.env.QA_URL || process.env.BASE_URL || 'https://www.indiaagram.com/login',
  dev: process.env.DEV_URL || 'https://dev.example.com',
  app: process.env.APP_URL || 'https://app.example.com'
};

export function getUrl(): string {
  const env = (process.env.ENVIRONMENT || 'qa').toLowerCase() as EnvironmentName;
  return urls[env] || urls.qa;
}
