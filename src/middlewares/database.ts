import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import dbConnect from '../lib/connectDB';
import { getLogger } from '../utils/logging/log-util';

const logger = getLogger('/dbConnect');

const database = async (
  _0: NextApiRequest,
  _1: NextApiResponse,
  next: NextHandler,
) => {
  try {
    await dbConnect();
  } catch (error: any) {
    logger.error('Database connection error ', error.message);
  }
  next();
};

export default database;
