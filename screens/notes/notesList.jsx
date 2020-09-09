/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { color } from '../../config';
import NoteCard from '../../components/miscellaneous/noteCard';

const NotesList = (props) => {
  const { notes, onNoteSelect, loadMore, loading } = props;

  const renderItem = ({ item }) => (
    <NoteCard onNoteSelect={onNoteSelect} noteItem={item} />
  );

  const keyExtractor = (item) => `_${item.learning_material_id}`;

  return (
    <FlatList
      data={notes}
      renderItem={renderItem}
      onRefresh={() => true}
      refreshing={loading}
      keyExtractor={keyExtractor}
      style={styles.list}
      contentContainerStyle={styles.listContainer}
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: color.backgroundLight,
  },
  listContainer: {
    paddingBottom: 10,
  },
});

export default NotesList;
