import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';

import useRepository from '../hooks/useRepository';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 4,
    marginTop: 4,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  textContainer: {
    paddingLeft: 20,
    flexShrink: 1,
  },
  rating: {
    width: 40,
    aspectRatio: 1,
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noComments: {
    textAlign: 'center',
  },
});

const ReviewItem = ({ review }) => {
  const { text, user, rating, createdAt } = review.node;
  const formattedDate = new Date(createdAt).toLocaleDateString('fi-FI');

  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text color="primary" fontWeight="bold">
          {rating}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text fontWeight="bold">{user.username}</Text>
        <Text color="textSecondary">{formattedDate}</Text>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const Repository = () => {
  const { rid } = useParams();
  const { repository, reviews } = useRepository(rid);

  if (!rid || !repository) return null;

  return (
    <FlatList
      data={reviews}
      ListEmptyComponent={() => (
        <Text style={styles.noComments}>No comments.</Text>
      )}
      renderItem={({ item }) => <ReviewItem review={item} key={item.id} />}
      ListHeaderComponent={() => <RepositoryItem item={repository} repBtn />}
    />
  );
};
export default Repository;
