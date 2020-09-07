/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { color } from '../../../config';
import { useSelector, useDispatch } from 'react-redux';
import * as examRunningActions from '../../../store/actions/exam/running';
import Question from './question';
import Options from './options';

const QuestionNOptions = () => {
  const dispatch = useDispatch();
  const question = useSelector((state) => state.exam.running.activeQuestion);
  const questionsIdIndexMap = useSelector(
    (state) => state.exam.running.questionsIdIndexMap,
  );

  const questionsChoosedOptionIds = useSelector(
    (state) => state.exam.running.questionsChoosedOptionIds,
  );

  const keysArr = Object.keys(questionsIdIndexMap);
  const idIndex = keysArr.indexOf(`${question.id}`);

  const currentQuestion = idIndex + 1;

  const options = question.options;

  const totalQuestions = keysArr.length;

  const optionChooseHanlder = (option) => {
    dispatch(examRunningActions.handleChooseOption(option));
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <>
          <Question
            totalQuestions={totalQuestions}
            currentQuestion={currentQuestion}
            question={question}
            options={options}
          />
          <Options
            options={options}
            optionChooseHanlder={optionChooseHanlder}
            questionsChoosedOptionIds={questionsChoosedOptionIds}
          />
        </>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.white,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    elevation: 2,
    borderRadius: 4,
    marginHorizontal: 24,
    marginTop: 12,
    flex: 1,
  },
  content: {
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default QuestionNOptions;
