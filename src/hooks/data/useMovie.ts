import { useQuery } from "react-query";
import axios from "axios";
import { IMovie } from "../../../@types";

const fetchMovie = (movieId: string) =>
  axios
    .get(`${process.env.NEXT_PUBLIC_DEV_API_URL}/movies/${movieId}`)
    .then((response) => response.data);

/**
 * 
 * @param movieId The id of the movie you'd like to fetch
 * @returns useQuery hook of the specific movie
 */
const useMovie = (movieId: string) => {
  return useQuery<IMovie, Error>(["movies", movieId], () =>
    fetchMovie(movieId)
  );
};

export default useMovie;
