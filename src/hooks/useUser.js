import { useQuery } from '@apollo/client';

import { ME } from '../graphql/queries';

const useUser = (includeReviews = false) => {
  const variables = {
    includeReviews,
  };
  const { data, error, loading, fetchMore, ...result } = useQuery(ME, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const isLoggedIn = !!data?.me;

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data?.me.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    data,
    loading,
    error,
    isLoggedIn,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useUser;
