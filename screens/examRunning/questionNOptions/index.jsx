/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { color } from '../../../config';
import { useSelector, useDispatch } from 'react-redux';
import * as examRunningActions from '../../../store/actions/exam/running';
import Question from './question';
import Options from './options';

const QuestionNOptions = () => {
  const dispatch = useDispatch();
  const {
    activeQuestion: question,
    activeQuestionIndex,
    questions,
    reviewQuestionsChoosedOptions,
    reviewQuestionsAnswerOptionIds,
    isReview,
  } = useSelector((state) => state.exam.running);

  const questionsChoosedOptionIds = useSelector(
    (state) => state.exam.running.questionsChoosedOptionIds,
  );

  const currentQuestion = activeQuestionIndex + 1;

  const options = question.options;

  const totalQuestions = questions.length;

  const optionChooseHanlder = (option) => {
    dispatch(examRunningActions.handleChooseOption(option));
  };

  return (
    <View style={styles.card}>
      <ScrollView
        style={styles.content}
        persistentScrollbar
        contentContainerStyle={styles.contentContainerStyle}>
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
            isReview={isReview}
            reviewQuestionsChoosedOptions={reviewQuestionsChoosedOptions}
            reviewQuestionsAnswerOptionIds={reviewQuestionsAnswerOptionIds}
            question={question}
          />
        </>
      </ScrollView>
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
    alignSelf: 'stretch',
  },
  contentContainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default QuestionNOptions;
