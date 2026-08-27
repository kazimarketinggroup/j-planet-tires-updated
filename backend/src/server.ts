import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    if (!config.database_url) {
      throw new Error('DATABASE_URL is required');
    }

    if (process.env.NODE_ENV !== 'production') {
      await mongoose.connect(config.database_url as string);
      app.listen(config.port);
    }
  } catch {
    process.exitCode = 1;
  }
}

main();

export default app;
