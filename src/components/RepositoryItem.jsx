import { Image, Pressable, StyleSheet, View } from 'react-native';
import * as Linking from 'expo-linking';

import Text from './Text';
import theme from '../theme';
import { shortNumber } from '../utils/shortNumber';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 4,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
  },
  nameContainer: {
    marginStart: 10,
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  description: {
    marginTop: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    color: 'white',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  stats: {
    width: '85%',
    marginStart: 'auto',
    marginEnd: 'auto',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsItem: {
    alignItems: 'center',
  },
  btn: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
});

const RepositoryItem = ({ item, repBtn }) => {
  const handleLink = () => {
    Linking.openURL(item.url);
  };

  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.nameContainer}>
          <Text fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>
          <Text color="textSecondary" style={styles.description}>
            {item.description}
          </Text>
          <Text style={styles.language} fontWeight="bold">
            {item.language}
          </Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.statsItem}>
          <Text fontWeight="bold">{shortNumber(item.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.statsItem}>
          <Text fontWeight="bold">{shortNumber(item.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.statsItem}>
          <Text fontWeight="bold">{shortNumber(item.reviewCount)}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.statsItem}>
          <Text fontWeight="bold">{shortNumber(item.ratingAverage)}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
      {repBtn && (
        <Pressable style={styles.btn} onPress={handleLink}>
          <Text fontWeight="bold" style={styles.btnText}>
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
