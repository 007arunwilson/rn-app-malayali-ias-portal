/**
 * @format
 * @flow strict-local
 */
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { color } from '../../config';
import { useSelector, useDispatch } from 'react-redux';
import InlineLoader from '../../components/miscellaneous/inlineLoader';
import Title from './title';
import BasicMeta from './basicMeta';
import StartExam from './startExam';
import ResumeExam from './resumeExam';
import ResultView from './resultView';
import * as examRunningActions from '../../store/actions/exam/running';

const ExamDetail = () => {
  const dispatch = useDispatch();

  const examDetailData = useSelector((state) => state.exam.detail.data);
  const examAttemptData = useSelector((state) => state.exam.attemptData);
  const examLoading = useSelector((state) => state.exam.detail.loading);
  const loadingQuestions = useSelector(
    (state) => state.exam.running.loadingQuestions,
  );

  const processStartExam = (isReview) =>
    dispatch(examRunningActions.processStartExam(isReview));

  const {
    title,
    description,
    duration,
    questionsCount,
    totalScore,
    startedOn,
    submittedOn,
  } = examDetailData;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {examLoading ? (
        <>
          <View style={styles.card}>
            <Title title={title} description={description} />
            <InlineLoader />
          </View>
        </>
      ) : (
        <>
          <View style={styles.card}>
            <Title title={title} description={description} />
            <View style={styles.bottom}>
              <View style={styles.bottomLhs}>
                <BasicMeta
                  duration={duration}
                  questionsCount={questionsCount}
                  totalScore={totalScore}
                />
              </View>
            </View>
          </View>

          {!startedOn || (startedOn && !submittedOn) ? (
            <StartExam
              duration={duration}
              loadingQuestions={loadingQuestions}
              processStartExam={processStartExam}
            />
          ) : null}
          {/* {startedOn && !submittedOn ? (
            <ResumeExam startedOn={startedOn} />
          ) : null} */}
          {startedOn && submittedOn ? (
            <ResultView
              examAttemptData={examAttemptData}
              questionsCount={questionsCount}
              loadingQuestions={loadingQuestions} // For review exam view
              processStartExam={processStartExam}
            />
          ) : null}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: color.backgroundLight,
    alignItems: 'center',
  },
  card: {
    backgroundColor: color.white,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    elevation: 2,
    borderRadius: 4,
    marginHorizontal: 24,
    marginTop: 12,
  },
  bottom: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginTop: 10,
  },
  bottomLhs: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  bottomLhsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    marginLeft: 2,
    color: color.textLight,
  },
  bottomRhs: {},
  examActionText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  examActionTextStart: {
    color: color.primaryLight,
  },
  examActionTextResult: {
    color: color.greenDark,
  },
  examActionTextResume: {
    color: color.orangeDark,
  },
  bottomLastRow: {
    marginTop: 10,
  },
});

ExamDetail.options = {
  topBar: {
    rightButtons: [
      {
        id: 'profile',
        component: {
          name: 'topbar.userIcon',
          aligment: 'center',
        },
      },
    ],
    title: {
      text: 'Exam',
    },
  },
};

export default ExamDetail;
