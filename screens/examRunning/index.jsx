/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, SafeAreaView, Alert, BackHandler } from 'react-native';
import React from 'react';
import { color } from '../../config';
import DurationNBullets from './durationNBullets';
import QuestionNOptions from './questionNOptions';
import BottomActions from './bottomActions';
import { useSelector, useDispatch } from 'react-redux';
import * as examRunningActions from '../../store/actions/exam/running';
import FullscreenTextLoader from '../../components/miscellaneous/fullscreenTextLoader';
import Categories from './categories';

const ExamRunning = () => {
  const dispatch = useDispatch();
  const { saving, ready, isReview } = useSelector(
    (state) => state.exam.running,
  );

  const exitExam = React.useCallback(
    (isTimeout) => {
      if (!isTimeout && !saving && !isReview) {
        Alert.alert(
          'Are you sure want to exit exam ?',
          'You can either pause the exam and continue later, or you can submit the exam.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            // {
            //   text: 'Pause Exam',
            //   onPress: () => dispatch(examRunningActions.pauseExam()),
            // },
            {
              text: 'Submit Exam',
              onPress: () => dispatch(examRunningActions.submitExam()),
            },
          ],
          { cancelable: false },
        );
      } else if (isTimeout) {
        dispatch(examRunningActions.submitExam());
      } else if (isReview) {
        dispatch(examRunningActions.exitReview());
      }
    },
    [dispatch, saving, isReview],
  );

  React.useEffect(() => {
    const backAction = () => {
      exitExam();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [exitExam]);

  return (
    <>
      {saving ? (
        <FullscreenTextLoader text={'Saving Exam ...'} />
      ) : ready ? (
        <SafeAreaView style={styles.container}>
          <DurationNBullets exitExam={exitExam} />
          <Categories />
          <QuestionNOptions />
          <BottomActions exitExam={exitExam} />
        </SafeAreaView>
      ) : (
        <FullscreenTextLoader />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundLight,
  },
});

ExamRunning.options = {
  topBar: {
    visible: false,
  },
};

export default ExamRunning;
