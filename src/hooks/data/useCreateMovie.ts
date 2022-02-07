import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IMovie } from "../../../@types";

const createMovie = (values: IMovie) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_DEV_API_URL}/movies/`, values)
    .then((response: { data: any }) => response.data);
};

const useCreateMovie = () => {
  const queryClient = useQueryClient();
  return useMutation((newMovie: IMovie) => createMovie(newMovie), {
    onSuccess: (result) => {
      queryClient.invalidateQueries(["movies", result.data]);
    },
  });
};

export default useCreateMovie;
