import app from './app.js';
import { connectDatabase } from './config/db.js';
import config from './config/env.js';

const startServer = async () => {
  await connectDatabase();

  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
