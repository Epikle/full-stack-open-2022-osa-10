import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import Text from './Text';
import theme from '../theme';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <Link to="/">
          <Text style={styles.header} fontWeight="bold" fontSize="subheading">
            Repositories
          </Text>
        </Link>
        <Link to="/login">
          <Text style={styles.header} fontWeight="bold" fontSize="subheading">
            Sign in
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
