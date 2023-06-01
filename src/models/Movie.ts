import mongoose, { Document, Model } from 'mongoose';

import { IMovie } from '../@types';

type MovieDocument = Document & IMovie;

const MovieSchema = new mongoose.Schema<MovieDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    runtime: {
      type: Number,
      required: true,
    },
    released: {
      type: Date,
      required: true,
    },
    imdb: {
      rating: {
        type: Number,
        required: true,
      },
      votes: {
        type: Number,
        required: true,
      },
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Movie: Model<MovieDocument> = mongoose.models.Movie || mongoose.model<MovieDocument>('Movie', MovieSchema);

export default Movie;
