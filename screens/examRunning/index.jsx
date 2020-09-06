/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { color } from '../../config';

const ExamRunning = () => {
  return (
    <>
      <ScrollView contentContainerStyle={styles.container} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: color.backgroundLight,
    alignItems: 'center',
  },
});

ExamRunning.options = {
  topBar: {
    title: {
      text: 'Exam',
    },
  },
};

export default ExamRunning;
