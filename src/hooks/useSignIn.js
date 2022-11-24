import { useApolloClient, useMutation } from '@apollo/client';

import { GET_TOKEN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(GET_TOKEN);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });

    if (data?.authenticate) {
      await authStorage.setAccessToken(data.authenticate?.accessToken);
      await apolloClient.resetStore();
    }

    return data;
  };

  return [signIn, result];
};

export default useSignIn;
