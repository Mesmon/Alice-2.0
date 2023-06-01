import mongoose from 'mongoose';
import { getLogger } from '../utils/logging/log-util';

const logger = getLogger('dbConnect');

const dbConnect = async () => {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    // already connected
    return;
  }

  mongoose.connection.on('connected', () => {
    logger.info('connected to mongo db');
  });

  mongoose.connection.on('error', (err) => {
    logger.error('db connection problem', err.message);
  });

  return mongoose.connect(process.env.MONGODB_URL!, {
    dbName: process.env.MONGODB_DB!,
  });
};

export default dbConnect;
