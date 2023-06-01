import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { IMovie } from '../../@types';
import { getLogger } from '../../utils/logging/log-util';

const logger = getLogger('useSaveMovie');

const useSaveMovie = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, values }: { id: string | number; values: Partial<IMovie> }) => axios
      .patch(`${process.env.NEXT_PUBLIC_DEV_API_URL}/movies/${id}`, values)
      .then((result) => result.data),

    {
      // 💡 response of the mutation is passed to onSuccess
      onSuccess: (updatedMovie: IMovie) => {
        logger.info(updatedMovie);
        queryClient.setQueryData(['movies', updatedMovie._id], updatedMovie);
      },
    },
  );
};

export default useSaveMovie;
