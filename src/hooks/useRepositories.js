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

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: { ...order, searchKeyword },
    fetchPolicy: 'cache-and-network',
  });

  return { repositories: data?.repositories, loading, error };
};

export default useRepositories;
