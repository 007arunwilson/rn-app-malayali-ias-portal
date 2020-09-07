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

const reset = (payload) => (dispatch) =>
  dispatch({
    type: types.reset,
    payload,
  });

const processStartExam = () => (dispatch, getState) => {
  const state = getState();
  const { testId, duration } = state.exam.detail.data;

  dispatch(updateLoadingQuestions(true));

  Promise.all([
    examApi.getQuestions({ urlParams: { testId } }),
    examApi.getQuestionCategories({ urlParams: { testId } }),
  ]).then(([questionsResult, questionsCategoryResult]) => {
    const questionIdsIndexMap = {};
    questionsResult.forEach((item, index) => {
      questionIdsIndexMap[item.id] = index;
    });
    dispatch(updateQuestions(questionsResult));
    dispatch(updateQuestionsIdIndexMap(questionIdsIndexMap));

    const categoriesIdIndexMap = {};
    questionsCategoryResult.forEach((item, index) => {
      categoriesIdIndexMap[item.id] = index;
    });
    dispatch(updateCategories(questionsCategoryResult));
    dispatch(updateCategoriesIdIndexMap(categoriesIdIndexMap));

    const activeQuestionId = questionsResult[0].id;
    dispatch(setActiveQuestion(activeQuestionId));

    dispatch(updateTimer(duration));

    examApi
      .createUserAttempt({
        urlParams: { learningMaterialTestId: testId },
      })
      .then(() => {
        // Assuming that start exam is only navigate from examDetail page
        Navigation.push('examDetail', navComponents.examRunning).then(() => {
          dispatch(updateLoadingQuestions(false));
          dispatch(updateReady(true));
        });
      });
  });
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
  const { questionsIdIndexMap, questions } = state.exam.running;

  // have Next question / previous Question
  const keysArr = Object.keys(questionsIdIndexMap);
  const valuesArr = Object.values(questionsIdIndexMap);
  console.log(keysArr[questionIndex]);
  const questionTargetIndex = questionsIdIndexMap[keysArr[questionIndex]];
  // console.log(questions[questionTargetIndex]);

  // const indexIndex = valuesArr.indexOf(questionIndex);
  // const questionId = keysArr[indexIndex];

  // const questionTargetIndex = questionsIdIndexMap[questionId];
  const question = questions[questionTargetIndex];

  const idIndex = keysArr.indexOf(`${question.id}`);

  dispatch(updateActiveQuestion(question));

  const questionCategoryId = question.cst_item_id;
  if (questionCategoryId) {
    dispatch(updateActiveCategoryId(questionCategoryId));
  }

  const idIndexRespectiveValue = valuesArr[idIndex];
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
  const { questionsIdIndexMap, activeQuestion } = state.exam.running;
  const keysArr = Object.keys(questionsIdIndexMap);
  const valuesArr = Object.values(questionsIdIndexMap);
  const idIndex = keysArr.indexOf(`${activeQuestion.id}`);

  const idIndexRespectiveValue = valuesArr[idIndex];
  const idIndexRespectiveValueNextIndex = idIndexRespectiveValue + 1;
  const idIndexRespectiveValueNextIndexValue =
    valuesArr[idIndexRespectiveValueNextIndex];
  const nextQuestionId = keysArr[idIndexRespectiveValueNextIndexValue];
  dispatch(setActiveQuestion(nextQuestionId));
};

const processPreviousQuestion = () => (dispatch, getState) => {
  const state = getState();
  const { questionsIdIndexMap, activeQuestion } = state.exam.running;

  const keysArr = Object.keys(questionsIdIndexMap);
  const valuesArr = Object.values(questionsIdIndexMap);
  const idIndex = keysArr.indexOf(`${activeQuestion.id}`);

  const idIndexRespectiveValue = valuesArr[idIndex];

  const idIndexRespectiveValuePreviousIndex = idIndexRespectiveValue - 1;
  const idIndexRespectiveValuePreviosuIndexValue =
    valuesArr[idIndexRespectiveValuePreviousIndex];

  const previousQuestionId = keysArr[idIndexRespectiveValuePreviosuIndexValue];
  dispatch(setActiveQuestion(previousQuestionId));
};

const pauseExam = () => (dispatch, getState) => {
  dispatch(updateSaving(true));
};

const submitExam = () => (dispatch, getState) => {
  const state = getState();
  const { questionsChoosedOptionIds } = state.exam.running;
  const { testId, id, title, description, duration } = state.exam.detail.data;
  dispatch(updateSaving(true));

  const examSubmitPayload = { question_choosed_options: [] };
  Object.keys(questionsChoosedOptionIds).forEach((key) => {
    examSubmitPayload.question_choosed_options.push({
      question_id: key,
      option_id: questionsChoosedOptionIds[key],
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
};
