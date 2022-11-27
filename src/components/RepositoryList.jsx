import { FlatList, View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  noRep: {
    marginTop: 10,
    textAlign: 'center',
  },
  filter: {
    margin: 10,
  },
  search: {
    margin: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  selectedSort,
  setSelectedSort,
  searchQuery,
  onChangeSearch,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Link to={`/repository/${item.id}`}>
          <RepositoryItem key={item.id} item={item} />
        </Link>
      )}
      ListEmptyComponent={() => <Text style={styles.noRep}>No items...</Text>}
      ListHeaderComponent={() => (
        <>
          <Searchbar
            style={styles.search}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            autoFocus={!!searchQuery}
          />
          <Picker
            style={styles.filter}
            selectedValue={selectedSort}
            onValueChange={(itemValue) => setSelectedSort(itemValue)}
          >
            <Picker.Item label="Latest repositories" value="latest" />
            <Picker.Item label="Highest rated repositories" value="highest" />
            <Picker.Item label="Lowest rated repositories" value="lowest" />
          </Picker>
        </>
      )}
    />
  );
};

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [search] = useDebounce(searchQuery, 500);
  const { repositories, loading, error } = useRepositories(
    selectedSort,
    search
  );

  const onChangeSearch = (query) => setSearchQuery(query);

  if (error) return <Text style={styles.noRep}>{error.message}</Text>;
  if (loading) return <Text style={styles.noRep}>Loading...</Text>;

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedSort={selectedSort}
      setSelectedSort={setSelectedSort}
      searchQuery={searchQuery}
      onChangeSearch={onChangeSearch}
    />
  );
};

export default RepositoryList;
