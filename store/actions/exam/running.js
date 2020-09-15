import update from 'immutability-helper';
import * as types from '../../types/exam/running';
import * as examApi from '../../../services/exam';
import { Navigation } from 'react-native-navigation';
import { navComponents } from '../../../navigation';
import * as examAttempDataActions from '../../actions/exam/attemptData';
import * as examDetailActions from '../../actions/exam/detail';
import * as examsActions from '../../actions/exams';

const updateLoadingQuestions = (payload) => (dispatch) =>
  dispatch({
    type: types.loadingQuestions,
    payload,
  });

const updateQuestions = (payload) => (dispatch) =>
  dispatch({
    type: types.questions,
    payload,
  });

const updateQuestionsIdIndexMap = (payload) => (dispatch) =>
  dispatch({
    type: types.questionsIdIndexMap,
    payload,
  });

const updateCategories = (payload) => (dispatch) =>
  dispatch({
    type: types.categories,
    payload,
  });

const updateCategoriesIdIndexMap = (payload) => (dispatch) =>
  dispatch({
    type: types.categoriesIdIndexMap,
    payload,
  });

const updateActiveQuestion = (payload) => (dispatch) =>
  dispatch({
    type: types.activeQuestion,
    payload,
  });

const updateActiveCategoryId = (payload) => (dispatch) =>
  dispatch({
    type: types.activeCategoryId,
    payload,
  });

const updateQuestionsChoosedOptionIds = (payload) => (dispatch) =>
  dispatch({
    type: types.questionsChoosedOptionIds,
    payload,
  });

const updateHaveNextQuestion = (payload) => (dispatch) =>
  dispatch({
    type: types.haveNextQuestion,
    payload,
  });

const updateHavePreviousQuestion = (payload) => (dispatch) =>
  dispatch({
    type: types.havePreviousQuestion,
    payload,
  });

const updateTimer = (payload) => (dispatch) =>
  dispatch({
    type: types.timer,
    payload,
  });

const updateSaving = (payload) => (dispatch) =>
  dispatch({
    type: types.saving,
    payload,
  });

const updateReady = (payload) => (dispatch) =>
  dispatch({
    type: types.ready,
    payload,
  });

const updateActiveQuestionIndex = (payload) => (dispatch) =>
  dispatch({
    type: types.activeQuestionIndex,
    payload,
  });

const updateIsReview = (payload) => (dispatch) =>
  dispatch({
    type: types.isReview,
    payload,
  });

const updateSpendTimeByQuestionId = (payload) => (dispatch) =>
  dispatch({
    type: types.spendTimeByQuestionId,
    payload,
  });

const updateSpendTimeTrack = (payload) => (dispatch) =>
  dispatch({
    type: types.spendTimeTrack,
    payload,
  });

const updateReviewQuestionsChoosedOptions = (payload) => (dispatch) =>
  dispatch({
    type: types.reviewQuestionsChoosedOptions,
    payload,
  });

const updateReviewQuestionsAnswerOptionIds = (payload) => (dispatch) =>
  dispatch({
    type: types.reviewQuestionsAnswerOptionIds,
    payload,
  });

const reset = (payload) => (dispatch) =>
  dispatch({
    type: types.reset,
    payload,
  });

/**
 * This function also handle the review exam view, so be careful when playing with this.
 * it was bit complex for me :) ( Decision Fatigue )
 * */
const processStartExam = (isReview = false) => (dispatch, getState) => {
  const state = getState();
  const { testId, duration } = state.exam.detail.data;

  dispatch(updateLoadingQuestions(true));

  Promise.all([
    examApi.getQuestions({ urlParams: { testId } }),
    examApi.getQuestionCategories({ urlParams: { testId } }),
    isReview
      ? examApi.getQuestionsAnswersChoosedOptionsIds({ urlParams: { testId } })
      : Promise.resolve(),
    isReview
      ? examApi.getQuestionsAnswersOptionsIds({ urlParams: { testId } })
      : Promise.resolve(),
  ]).then(
    ([
      questionsResult,
      questionsCategoryResult,
      reviewQuestionsChoosedOptionsResult,
      reviewQuestionsAnswerOptionIdsResult,
    ]) => {

      const categoriesIdIndexMap = {};
      questionsCategoryResultUpdated = questionsCategoryResult.map((item, index) => {
        categoriesIdIndexMap[item.id] = index;
        return { ...item, questionsIndex: [] }
      });

      const questionsCategoryResultUpdatedOrdered = [];
      const questionsCategoryResultUpdatedOrderedPushedRef = [];

      const questionIdsIndexMap = {};
      questionsResult.forEach((item, index) => {
        questionIdsIndexMap[item.id] = index;
        if (item.cst_item_id) {
          const category = questionsCategoryResultUpdated[
            categoriesIdIndexMap[item.cst_item_id]
          ];

          category.questionsIndex.push(index);

          if (questionsCategoryResultUpdatedOrderedPushedRef.indexOf(category.id) === -1) {
            questionsCategoryResultUpdatedOrdered.push(category);
            questionsCategoryResultUpdatedOrderedPushedRef.push(category.id);
          }
        }
      });

      dispatch(updateQuestions(questionsResult));
      dispatch(updateQuestionsIdIndexMap(questionIdsIndexMap));

      // console.log('questionsCategoryResultUpdatedByOrderingIdIndex:', questionsCategoryResultUpdatedByOrderingIdIndex);


      const categories = questionsCategoryResultUpdatedOrdered;
      dispatch(updateCategories(categories));
      // dispatch(updateCategoriesIdIndexMap(categoriesIdIndexMap));

      dispatch(setActiveQuestionByIndex(0));

      if (isReview) {
        const reviewQuestionsChoosedOptions = {};
        reviewQuestionsChoosedOptionsResult.forEach((item) => {
          reviewQuestionsChoosedOptions[
            item.learning_material_test_question_id
          ] = item;
        });
        dispatch(
          updateReviewQuestionsChoosedOptions(reviewQuestionsChoosedOptions),
        );

        const reviewQuestionsAnswerOptionIds = {};
        reviewQuestionsAnswerOptionIdsResult.forEach((item) => {
          reviewQuestionsAnswerOptionIds[
            item.learning_material_test_question_id
          ] = item.id;
        });
        dispatch(
          updateReviewQuestionsAnswerOptionIds(reviewQuestionsAnswerOptionIds),
        );
      }

      dispatch(updateTimer(duration));

      new Promise((resolve) => {
        if (!isReview) {
          return examApi
            .deleteUserAttempts({
              urlParams: { learningMaterialTestId: testId },
            })
            .then(() =>
              examApi.createUserAttempt({
                urlParams: { learningMaterialTestId: testId },
              }),
            )
            .then(resolve);
        } else {
          resolve();
        }
      }).then(() => {
        // Assuming that start exam is only navigate from examDetail page
        Navigation.push('examDetail', navComponents.examRunning).then(() => {
          dispatch(updateLoadingQuestions(false));
          dispatch(updateIsReview(!!isReview));
          dispatch(updateReady(true));
        });
      });
    },
  );
};

const setActiveQuestion = (activeQuestionId) => (dispatch, getState) => {
  // const { testId } = state.exam.detail.data;
  const state = getState();
  const { questionsIdIndexMap, questions } = state.exam.running;
  // const categoryIdIndexMap = state.exam.running.questionIdIndexMap;
  // const questionIndex = questionsIdIndexMap[activeQuestionId];

  // have Next question / previous Question
  const keysArr = Object.keys(questionsIdIndexMap);
  const valuesArr = Object.values(questionsIdIndexMap);
  const idIndex = keysArr.indexOf(`${activeQuestionId}`);

  const idIndexRespectiveValue = valuesArr[idIndex];

  const question = questions[idIndexRespectiveValue];

  dispatch(updateActiveQuestion(question));

  const questionCategoryId = question.cst_item_id;
  if (questionCategoryId) {
    dispatch(updateActiveCategoryId(questionCategoryId));
  }

  const idIndexRespectiveValueNextIndex = idIndexRespectiveValue + 1;
  const idIndexRespectiveValueNextIndexValue =
    valuesArr[idIndexRespectiveValueNextIndex];

  const idIndexRespectiveValuePreviousIndex = idIndexRespectiveValue - 1;
  const idIndexRespectiveValuePreviosuIndexValue =
    valuesArr[idIndexRespectiveValuePreviousIndex];

  dispatch(updateHaveNextQuestion(!!idIndexRespectiveValueNextIndexValue));
  dispatch(
    updateHavePreviousQuestion(!!idIndexRespectiveValuePreviosuIndexValue),
  );
};

const setActiveQuestionByIndex = (questionIndex) => (dispatch, getState) => {
  // const { testId } = state.exam.detail.data;
  const state = getState();
  const {
    questions,
    spendTimeTrack,
    spendTimeByQuestionId,
    isReview,
    activeQuestion: currentQuestion,
  } = state.exam.running;

  const question = questions[questionIndex];

  dispatch(updateActiveQuestion(question));
  dispatch(updateActiveQuestionIndex(questionIndex));

  const questionCategoryId = question.cst_item_id;
  if (questionCategoryId) {
    dispatch(updateActiveCategoryId(questionCategoryId));
  }

  if (!isReview) {
    const now = new Date();
    if (currentQuestion && spendTimeTrack) {
      const updatedSpendTimeByQuestionId = update(spendTimeByQuestionId, {
        [currentQuestion.id]: {
          $set:
            now.getTime() -
            spendTimeTrack +
            (spendTimeByQuestionId[currentQuestion.id] || 0),
        },
      });
      dispatch(updateSpendTimeByQuestionId(updatedSpendTimeByQuestionId));
    }
    dispatch(updateSpendTimeTrack(now.getTime()));
  }

  dispatch(updateHaveNextQuestion(questions.length > questionIndex + 1));
  dispatch(updateHaveNextQuestion(questionIndex > 0));
};

const handleChooseOption = (optionItem) => (dispatch, getState) => {
  const state = getState();
  const { questionsChoosedOptionIds } = state.exam.running;

  const questionId = optionItem.learning_material_test_question_id;
  const optionId = optionItem.id;

  let questionsChoosedOptionIdsUpdated = null;

  if (questionsChoosedOptionIds[questionId] === optionId) {
    questionsChoosedOptionIdsUpdated = update(questionsChoosedOptionIds, {
      $unset: [questionId],
    });
  } else {
    questionsChoosedOptionIdsUpdated = update(questionsChoosedOptionIds, {
      [questionId]: { $set: optionId },
    });
  }

  dispatch(updateQuestionsChoosedOptionIds(questionsChoosedOptionIdsUpdated));
};

const processNextQuestion = () => (dispatch, getState) => {
  const state = getState();
  const { activeQuestionIndex } = state.exam.running;
  dispatch(setActiveQuestionByIndex(activeQuestionIndex + 1));
};

const processPreviousQuestion = () => (dispatch, getState) => {
  const state = getState();
  const { activeQuestionIndex } = state.exam.running;
  dispatch(setActiveQuestionByIndex(activeQuestionIndex - 1));
};

const pauseExam = () => (dispatch, getState) => {
  dispatch(updateSaving(true));
};

const submitExam = () => (dispatch, getState) => {
  const state = getState();
  const {
    questionsChoosedOptionIds,
    spendTimeByQuestionId,
    spendTimeTrack,
    activeQuestion: currentQuestion,
  } = state.exam.running;
  const { testId, id, title, description, duration } = state.exam.detail.data;
  dispatch(updateSaving(true));

  // Updating Last question's spend time
  const now = new Date();
  const updatedSpendTimeByQuestionId = update(spendTimeByQuestionId, {
    [currentQuestion.id]: {
      $set:
        now.getTime() -
        spendTimeTrack +
        (spendTimeByQuestionId[currentQuestion.id] || 0),
    },
  });

  const examSubmitPayload = { question_choosed_options: [] };
  Object.keys(questionsChoosedOptionIds).forEach((key) => {
    examSubmitPayload.question_choosed_options.push({
      question_id: key,
      option_id: questionsChoosedOptionIds[key],
      meta: {
        spend_time: updatedSpendTimeByQuestionId[key],
      },
    });
  });

  examApi.submitExam({ urlParams: { testId }, data: examSubmitPayload }).then(
    () => {
      examApi
        .getUserAttempt({ urlParams: { learningMaterialTestId: testId } })
        .then((attemptData) => {
          const updatedExamItem = {
            learning_material_id: id,
            title,
            description,
            learning_material_test_id: testId,
            duration,
            learning_material_test_meta: null,
            learning_material_test_user_attempt_started_on:
              attemptData.started_on,
            learning_material_test_user_attempt_submitted_on:
              attemptData.submitted_on,
          };

          dispatch(examDetailActions.reset());
          dispatch(examAttempDataActions.reset());
          dispatch(examsActions.reset()); // To reload exams listing view
          dispatch(updateReady(false));

          dispatch(
            examsActions.navigateToExam({
              examItem: updatedExamItem,
              navigation: {
                type: 'pop',
                from: 'examRunning',
              },
            }),
          );
        });
    },
    (error) => { },
  );
};

const exitReview = () => (dispatch) => {
  dispatch(examDetailActions.reset());
  dispatch(examAttempDataActions.reset());
  dispatch(updateReady(false));
  Navigation.popTo('exams').catch(() => {
    // If pop to exams failed, then it's a direct access from home direct, so poping to home
    Navigation.popTo('home');
  });
};

export {
  updateLoadingQuestions,
  processStartExam,
  setActiveQuestion,
  reset,
  handleChooseOption,
  processNextQuestion,
  processPreviousQuestion,
  updateTimer,
  pauseExam,
  submitExam,
  updateSaving,
  updateReady,
  setActiveQuestionByIndex,
  updateActiveQuestionIndex,
  updateSpendTimeByQuestionId,
  exitReview,
};
