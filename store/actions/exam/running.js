import update from 'immutability-helper';
import * as types from '../../types/exam/running';
import * as examApi from '../../../services/exam';
import { Navigation } from 'react-native-navigation';
import { navComponents } from '../../../navigation';

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

const reset = (payload) => (dispatch) =>
  dispatch({
    type: types.reset,
    payload,
  });

const processStartExam = () => (dispatch, getState) => {
  const state = getState();
  const { testId } = state.exam.detail.data;

  dispatch(updateLoadingQuestions(true));

  Promise.all([
    examApi.getQuestions({ urlParams: { testId } }),
    examApi.getQuestionCategories({ urlParams: { testId } }),
  ])
    .then(([questionsResult, questionsCategoryResult]) => {
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

      // Assuming that start exam is only navigate from examDetail page
      Navigation.push('examDetail', navComponents.examRunning);
    })
    .finally(() => dispatch(updateLoadingQuestions(false)));
};

const setActiveQuestion = (activeQuestionId) => (dispatch, getState) => {
  // const { testId } = state.exam.detail.data;
  const state = getState();
  const { questionsIdIndexMap, questions } = state.exam.running;
  // const categoryIdIndexMap = state.exam.running.questionIdIndexMap;
  const questionIndex = questionsIdIndexMap[activeQuestionId];
  const question = questions[questionIndex];

  dispatch(updateActiveQuestion(question));

  const questionCategoryId = question.cst_item_id;
  if (questionCategoryId) {
    dispatch(updateActiveCategoryId(questionCategoryId));
  }

  // have Next question / previous Question
  const questionsIdIndexMapKeysArr = Object.keys(questionsIdIndexMap);

  const indexOfquestionIdInArr = questionsIdIndexMapKeysArr.indexOf(
    `${activeQuestionId}`,
  );

  const indexNextOfquestionIdInArr = indexOfquestionIdInArr + 1;
  const indexPreviousOfquestionIdInArr = indexOfquestionIdInArr - 1;

  const updateHaveNextQuestionValue =
    questionsIdIndexMapKeysArr[indexNextOfquestionIdInArr];
  const updateHavePreviousQuestionValue =
    questionsIdIndexMapKeysArr[indexPreviousOfquestionIdInArr];

  dispatch(updateHaveNextQuestion(!!updateHaveNextQuestionValue));
  dispatch(updateHavePreviousQuestion(!!updateHavePreviousQuestionValue));
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

  const questionsIdIndexMapKeysArr = Object.keys(questionsIdIndexMap);

  const indexOfquestionIdInArr = questionsIdIndexMapKeysArr.indexOf(
    `${activeQuestion.id}`,
  );

  const indexNextOfquestionIdInArr = indexOfquestionIdInArr + 1;
  const nextQuestionId = questionsIdIndexMapKeysArr[indexNextOfquestionIdInArr];
  dispatch(setActiveQuestion(nextQuestionId));
};

const processPreviousQuestion = () => (dispatch, getState) => {
  const state = getState();
  const { questionsIdIndexMap, activeQuestion } = state.exam.running;

  const questionsIdIndexMapKeysArr = Object.keys(questionsIdIndexMap);

  const indexOfquestionIdInArr = questionsIdIndexMapKeysArr.indexOf(
    `${activeQuestion.id}`,
  );

  const indexNextOfquestionIdInArr = indexOfquestionIdInArr - 1;
  const previousQuestionId =
    questionsIdIndexMapKeysArr[indexNextOfquestionIdInArr];
  dispatch(setActiveQuestion(previousQuestionId));
};

export {
  updateLoadingQuestions,
  processStartExam,
  setActiveQuestion,
  reset,
  handleChooseOption,
  processNextQuestion,
  processPreviousQuestion,
};
