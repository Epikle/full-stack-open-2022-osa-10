import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (rid) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { rid },
    fetchPolicy: 'cache-and-network',
  });

  return {
    repository: data?.repository,
    reviews: data?.repository?.reviews?.edges,
    loading,
    error,
  };
};

export default useRepository;
