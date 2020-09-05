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
import { useSelector } from 'react-redux';
import InlineLoader from '../../components/miscellaneous/inlineLoader';
import Title from './title';
import BasicMeta from './basicMeta';
import StartExam from './startExam';
import ResumeExam from './resumeExam';

const ExamDetail = () => {
  const examDetailData = useSelector((state) => state.exam.detail.data);
  const examLoading = useSelector((state) => state.exam.detail.loading);

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

          {!startedOn ? <StartExam duration={duration} /> : null}
          {startedOn && !submittedOn ? <ResumeExam /> : null}
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
    title: {
      text: 'Exam',
    },
  },
};

export default ExamDetail;
