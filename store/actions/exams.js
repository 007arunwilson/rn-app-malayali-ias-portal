import * as types from '../types/exams';
import * as examsApi from '../../services/exams';
import * as examApi from '../../services/exam';
import config from '../../config';
import * as examDetailActions from '../actions/exam/detail';
import * as examAttempDataActions from '../actions/exam/attemptData';
import * as examRunningActions from '../actions/exam/running';
import { Navigation } from 'react-native-navigation';
import { navComponents } from '../../navigation';

const updateCount = (payload) => (dispatch) =>
  dispatch({
    type: types.count,
    payload,
  });

const updateLoading = (payload) => (dispatch) =>
  dispatch({
    type: types.loading,
    payload,
  });

const updateByIndex = (payload) => (dispatch) =>
  dispatch({
    type: types.byIndex,
    payload,
  });

const updatePaginationPage = (payload) => (dispatch) =>
  dispatch({
    type: types.paginationPage,
    payload,
  });

const reset = (payload) => (dispatch) =>
  dispatch({
    type: types.reset,
  });

const loadExams = (payload) => (dispatch, getState) => {
  const state = getState();
  const count = state.exams.count;
  const previousExamsByIndex = state.exams.byIndex;
  const limit = state.exams.pagination.limit;
  const activePackageId =
    config.env === 'local-' ? 30 : state.app.activePackageId;
  const promises = [];
  const { page } = payload;

  if (count === null) {
    promises.push(
      examsApi.getPackageExamsCount({
        urlParams: { packageId: activePackageId },
      }),
    );
  } else {
    promises.push(Promise.resolve());
  }

  promises.push(
    examsApi.getPackageExamsWithUserAttempt({
      urlParams: { packageId: activePackageId },
      params: { page, limit },
    }),
  );

  dispatch(updateLoading(true));
  Promise.all(promises)
    .then(([packageExamsCount, packageExamsWithUserAttempt]) => {
      if (typeof packageExamsCount !== 'undefined') {
        dispatch(updateCount(Number(packageExamsCount)));
      }
      let updatedExamsByIndex = packageExamsWithUserAttempt;
      if (previousExamsByIndex) {
        updatedExamsByIndex = [...previousExamsByIndex, ...updatedExamsByIndex];
      }
      dispatch(updateByIndex(updatedExamsByIndex));
      dispatch(updatePaginationPage(page));
    })
    .catch((error) => error)
    .finally(() => dispatch(updateLoading(false)));
};

const navigateToExam = (payload) => (dispatch, getState) => {
  const state = getState();
  const { examItem } = payload;

  const previousExamId = state.exam.detail.data.id;

  if (previousExamId !== examItem.learning_material_id) {
    dispatch(examDetailActions.reset());
    dispatch(examAttempDataActions.reset());
    dispatch(examRunningActions.reset());
  }

  const examIntroData = {
    id: examItem.learning_material_id,
    testId: examItem.learning_material_test_id,
    title: examItem.title,
    description: examItem.description,
    duration: examItem.duration,
    startedOn: examItem.learning_material_test_user_attempt_started_on,
    submittedOn: examItem.learning_material_test_user_attempt_submitted_on,
  };

  dispatch(examDetailActions.updateLoading(true));
  dispatch(examDetailActions.updateData(examIntroData));

  // Assuming that navigation to exam scrfeen is only happens from exam listing screen
  // Navigation.push('exams', navComponents.examDetail);

  if (payload.navigation) {
    const { navigation } = payload;
    if (navigation.type === 'push') {
      Navigation.push(navigation.from, navComponents.examDetail);
    } else if (navigation.type === 'pop') {
      Navigation.pop(navigation.from, navComponents.examDetail);
    }
  }

  const promises = [];

  // Load Exams Detail and Attempt
  promises.push(
    examApi.getExam({
      urlParams: { learningMaterialId: examIntroData.id },
    }),
  );

  if (examIntroData.startedOn) {
    promises.push(
      examApi.getUserAttempt({
        urlParams: { learningMaterialTestId: examIntroData.testId },
      }),
    );
  } else {
    promises.push(Promise.resolve());
  }

  Promise.all(promises)
    .then(([examDetailResult, userAttemptResult]) => {
      // Result of the properties are populated with Intro data
      const examExtendedData = {
        questionsCount: examDetailResult.question_count,
        totalScore: examDetailResult.total_score,
      };
      dispatch(examDetailActions.updateData(examExtendedData));

      if (userAttemptResult) {
        const examAttempData = {
          startedOn: userAttemptResult.started_on,
          submittedOn: userAttemptResult.submitted_on,
          answeredQuestion: userAttemptResult.answered_questions,
          rightlyAnswered: userAttemptResult.rightly_answered,
          totalScore: userAttemptResult.total_score,
          rightlyAnsweredScore: userAttemptResult.rightly_answered_score,
          wronglyAnswered: userAttemptResult.wrongly_answered,
          negativeScore: userAttemptResult.negative_score,
          optainedScore: userAttemptResult.optained_score,
        };

        dispatch(examAttempDataActions.update(examAttempData));
      }
    })
    .finally(() => dispatch(examDetailActions.updateLoading(false)));
};

export { loadExams, navigateToExam, reset };
