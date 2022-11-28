import { FlatList, StyleSheet, View, Alert } from 'react-native';
import { Link, useParams } from 'react-router-native';

import useRepository from '../hooks/useRepository';
import useReview from '../hooks/useReview';
import useUser from '../hooks/useUser';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 4,
    marginTop: 4,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  rows: {
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
  btnContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btn: {
    marginTop: 15,
    padding: 15,
    borderRadius: 5,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewRep: {
    marginEnd: 10,
    backgroundColor: theme.colors.primary,
  },
  deleteRep: {
    marginStart: 10,
    backgroundColor: theme.colors.error,
  },
});

export const ReviewItem = ({ review, owner }) => {
  const { text, user, rating, createdAt, repositoryId, id } = review.node;
  const formattedDate = new Date(createdAt).toLocaleDateString('fi-FI');
  const { deleteReview } = useReview(id);
  const { refetch } = useUser(true);

  const deleteBtnHandler = () => {
    console.log('deleting...', id);

    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancelled'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteReview();
            await refetch();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.rows}>
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
      {owner && (
        <View style={styles.btnContainer}>
          <Link
            to={`/repository/${repositoryId}`}
            style={[styles.btn, styles.viewRep]}
          >
            <Text
              fontWeight="bold"
              fontSize="subheading"
              style={{ color: 'white' }}
            >
              View repository
            </Text>
          </Link>
          <Link
            style={[styles.btn, styles.deleteRep]}
            onPress={deleteBtnHandler}
          >
            <Text
              fontWeight="bold"
              fontSize="subheading"
              style={{ color: 'white' }}
            >
              Delete review
            </Text>
          </Link>
        </View>
      )}
    </View>
  );
};

const Repository = () => {
  const { rid } = useParams();
  const { repository, reviews, fetchMore } = useRepository(rid);

  const onEndReach = () => {
    console.log('End of comments list');
    fetchMore();
  };

  if (!rid || !repository) return null;

  return (
    <FlatList
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
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
