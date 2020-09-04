/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, FlatList, Text } from 'react-native';
import React from 'react';
import { color } from '../../config';
import ExamCard from '../../components/miscellaneous/examCard';

const ExamsList = (props) => {
  const { exams, onExamSelect } = props;

  const renderItem = ({ item }) => (
    <ExamCard onExamSelect={onExamSelect} examItem={item} />
  );

  const keyExtractor = (item) => `_${item.learning_material_id}`;

  return (
    <FlatList
      data={exams}
      renderItem={renderItem}
      // onRefresh={() => true}
      // refreshing={true}
      keyExtractor={keyExtractor}
      style={styles.list}
      contentContainerStyle={styles.listContainer}
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

ExamsList.options = {
  topBar: {
    title: {
      text: 'Videos',
    },
  },
};

export default ExamsList;
