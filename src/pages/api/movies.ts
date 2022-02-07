import database from "../../../middlewares/database";
import type { NextApiRequest, NextApiResponse } from "next";
import Movie from "../../../models/Movie";
import nextConnect from "next-connect";

const handler = nextConnect();
handler.use(database);

handler
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const queryLimit = req.body.limit ? req.body.limit : 50; //hard coded limit - TODO: change to infinite query
      const movies = await Movie.find({})
        // .sort("-createdAt")
        .limit(queryLimit)
        .lean();
      res.status(200).json(movies);
    } catch (error: any) {
      console.log(error.message);

      res.status(500).json({ message: "Server Error" });
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      console.log(req.body);

      const movie = new Movie(JSON.parse(req.body));
      await movie.save();
      res.status(201).json(movie);
    } catch (error: any) {
      console.log(error.message);

      res.status(500).json({ message: "Server Error" });
    }
  });

export default handler;
