/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { color } from '../../config';
import DurationNBullets from './durationNBullets';
import QuestionNOptions from './questionNOptions';
import BottomActions from './bottomActions';

const ExamRunning = () => {
  return (
    <SafeAreaView style={styles.container}>
      <DurationNBullets />
      <QuestionNOptions />
      <BottomActions />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundLight,
  },
});

export default ExamRunning;
