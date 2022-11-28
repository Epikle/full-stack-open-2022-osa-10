import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sorting, searchKeyword = '') => {
  let order = {
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  };

  switch (sorting) {
    case 'highest':
      order.orderBy = 'RATING_AVERAGE';
      order.orderDirection = 'DESC';
      break;

    case 'lowest':
      order.orderBy = 'RATING_AVERAGE';
      order.orderDirection = 'ASC';
      break;

    default:
      order.orderBy = 'CREATED_AT';
      order.orderDirection = 'DESC';
      break;
  }

  const variables = { ...order, searchKeyword };

  const { data, error, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      variables,
      fetchPolicy: 'cache-and-network',
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    loading,
    error,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;
