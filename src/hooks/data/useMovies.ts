import { useQuery } from "react-query";
import axios from "axios";
import { IMovie } from "../../@types";

const fetchMovies = () => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_DEV_API_URL}/movies`)
    .then((response) => response.data);
};

const useMovies = () => {
  return useQuery<Array<IMovie>, Error>([`movies`], () => fetchMovies());
};

export default useMovies;
