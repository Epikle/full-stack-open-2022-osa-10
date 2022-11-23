import { Image, StyleSheet, View } from 'react-native';

import Text from './Text';
import theme from '../theme';

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
});

const shortNumber = (number) => {
  // eslint-disable-next-line no-undef
  const short = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number);
  return short.toLowerCase();
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default RepositoryItem;
