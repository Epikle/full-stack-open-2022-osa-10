import { FlatList, View, StyleSheet } from 'react-native';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  if (repositoryNodes.length === 0) return <Text>No items...</Text>;

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem key={item.id} item={item} />}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  if (error) return <Text>{error.message}</Text>;
  if (loading) return <Text>Loading...</Text>;

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
