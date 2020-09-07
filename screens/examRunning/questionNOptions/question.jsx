/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import HTMLrender from '../../../components/miscellaneous/htmlRender';

const Question = (props) => {
  const { totalQuestions, currentQuestion, question } = props;

  return (
    <>
      <View style={styles.top}>
        <Text style={styles.label}>Q: </Text>
        <Text style={styles.value}>
          {currentQuestion}/{totalQuestions}
        </Text>
      </View>
      <View style={styles.bottom}>
        <HTMLrender content={question.question} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Question;
