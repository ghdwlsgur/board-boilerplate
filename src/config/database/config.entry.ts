import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'dev'
      ? 'src/config/.env.dev'
      : 'src/config/.env.prod',
  ),
});

export default () => ({
  database: {
    host: process.env.DB_HOST || '',
    port: process.env.DB_PORT || '',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',
  },
});
