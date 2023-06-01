import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import Movie from '../../models/Movie';
import { getLogger } from '../../utils/logging/log-util';
import database from '../../middlewares/database';

const logger = getLogger('api/movies');

const handler = nextConnect();
handler.use(database);

handler
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const queryLimit = req.body.limit // hard coded limit - TODO: change to infinite query
        ? req.body.limit
        : 50;
      const movies = await Movie.find({})
        // .sort("-createdAt")
        .limit(queryLimit)
        .lean();
      res.status(200).json(movies);
    } catch (error: any) {
      logger.error(error.message);

      res.status(500).json({ message: 'Server Error' });
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      logger.info(`Request: ${req.body}`);

      const movie = new Movie(JSON.parse(req.body));
      await movie.save();
      res.status(201).json(movie);
    } catch (error: any) {
      logger.error(error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  });

export default handler;
