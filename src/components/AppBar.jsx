import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import Text from './Text';
import theme from '../theme';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingStart: 10,
    backgroundColor: theme.colors.bg,
  },
  scroll: {
    display: 'flex',
    flexDirection: 'row',
  },
  header: {
    padding: 10,
    color: 'white',
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const logoutBtnHandler = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <Link to="/">
          <Text style={styles.header} fontWeight="bold" fontSize="subheading">
            Repositories
          </Text>
        </Link>
        {data?.me && (
          <Link to="/review">
            <Text style={styles.header} fontWeight="bold" fontSize="subheading">
              Create a review
            </Text>
          </Link>
        )}
        {data?.me ? (
          <Link onPress={logoutBtnHandler}>
            <Text style={styles.header} fontWeight="bold" fontSize="subheading">
              Logout
            </Text>
          </Link>
        ) : (
          <Link to="/login">
            <Text style={styles.header} fontWeight="bold" fontSize="subheading">
              Sign in
            </Text>
          </Link>
        )}
        {!data?.me && (
          <Link to="/signup">
            <Text style={styles.header} fontWeight="bold" fontSize="subheading">
              Sign up
            </Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
