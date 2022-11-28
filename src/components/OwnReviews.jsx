import { FlatList, StyleSheet } from 'react-native';
import useUser from '../hooks/useUser';

import { ReviewItem } from './Repository';
import Text from './Text';

const styles = StyleSheet.create({
  noComments: {
    textAlign: 'center',
  },
});

const OwnReviews = () => {
  const { data, fetchMore } = useUser(true);

  const onEndReach = () => {
    console.log('End of reviews list');
    fetchMore();
  };

  if (!data?.me) return null;
  return (
    <FlatList
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      data={data?.me.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item} owner />}
      ListEmptyComponent={() => (
        <Text style={styles.noComments}>No reviews.</Text>
      )}
    />
  );
};

export default OwnReviews;
