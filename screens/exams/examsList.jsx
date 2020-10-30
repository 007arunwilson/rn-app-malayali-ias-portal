/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, FlatList, Text } from 'react-native';
import React from 'react';
import { color } from '../../config';
import ExamCard from '../../components/miscellaneous/examCard';

const ExamsList = (props) => {
  const { exams, onExamSelect, loadMore, loading, onRefresh } = props;

  const renderItem = ({ item }) => (
    <ExamCard onExamSelect={onExamSelect} examItem={item} />
  );

  const keyExtractor = (item) => `_${item.learning_material_id}`;

  return (
    <FlatList
      data={exams}
      renderItem={renderItem}
      onRefresh={onRefresh}
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

export default ExamsList;
