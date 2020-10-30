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
import { activeQuestion } from '../../../store/types/exam/running';
import HTMLrender from '../../../components/miscellaneous/htmlRender';

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

  const [showExplanation, setShowExplanation] = React.useState(0);

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
    <>
      <View style={[styles.card, styles.questionNOptions]}>
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
      {isReview &&
      question.explanation &&
      question.explanation !== '<br /> ' ? ( // Handling content is just <br> exception
        <View style={[styles.card, styles.reviewExplanationcard]}>
          <View style={[styles.content, styles.reviewExplanationContent]}>
            {showExplanation ? (
              <>
                <View style={styles.reviewExplanationValue}>
                  <HTMLrender content={question.explanation} />
                </View>
                <Text
                  onPress={() => setShowExplanation(false)}
                  style={styles.reviewExplanationLabel}>
                  Hide Explantion
                </Text>
              </>
            ) : (
              <Text
                onPress={() => setShowExplanation(true)}
                style={styles.reviewExplanationLabel}>
                Show Explantion
              </Text>
            )}
          </View>
        </View>
      ) : null}
    </>
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
  questionNOptions: {
    flex: 1,
  },
  reviewExplanationcard: {
    flex: 0,
  },
  reviewExplanationContent: {
    alignItems: 'flex-end',
  },
  reviewExplanationLabel: {
    fontSize: 12,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  reviewExplanationValue: {},
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
