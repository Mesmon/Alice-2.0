import type { NextApiRequest, NextApiResponse } from "next";

import nextConnect from "next-connect";

import database from "../../../../middlewares/database";
import Movie from "../../../../models/Movie";

const handler = nextConnect();
handler.use(database);

handler
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const movies = await Movie.find({ _id: `${req.query.movieId}` }).lean();
      res.status(200).json(movies);
    } catch (error: any) {
      console.log(error.message);

      res.status(500).json({ message: "Server Error" });
    }
  })
  .patch(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const movie = await Movie.findOneAndUpdate(
        { _id: req.query.movieId },
        req.body
      ).lean();
      res.status(201).json(movie);
    } catch (error: any) {
      console.log(error.message);

      res.status(500).json({ message: "Server Error" });
    }
  });

export default handler;
