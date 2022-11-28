import { View, StyleSheet, ScrollView } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import Constants from 'expo-constants';

import Text from './Text';
import theme from '../theme';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import useUser from '../hooks/useUser';

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
  const { isLoggedIn } = useUser();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const logoutBtnHandler = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/', { replace: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <Link to="/">
          <Text style={styles.header} fontWeight="bold" fontSize="subheading">
            Repositories
          </Text>
        </Link>
        {isLoggedIn && (
          <>
            <Link to="/review">
              <Text
                style={styles.header}
                fontWeight="bold"
                fontSize="subheading"
              >
                Create a review
              </Text>
            </Link>
            <Link to="/myreviews">
              <Text
                style={styles.header}
                fontWeight="bold"
                fontSize="subheading"
              >
                My reviews
              </Text>
            </Link>
          </>
        )}
        {isLoggedIn ? (
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
        {!isLoggedIn && (
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
