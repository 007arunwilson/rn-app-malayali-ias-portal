import update from 'immutability-helper';
import * as types from '../../types/exam/running';

const initialState = {
  loadingQuestions: false,
  questions: null,
  questionsIdIndexMap: null,
  activeQuestionId: null,
  questionsChoosedOptionIds: {},
  activeOptionId: null,
  timeSpendedInQuestion: {},
  lastQuestionSwitchedTime: null,
  categories: null,
  categoriesIdIndexMap: null,
  categoriesQuestionIds: {},
  activeCategoryId: null,
  activeQuestion: null,
  timer: null,
  examRunning: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.loadingQuestions: {
      const updatedState = update(state, {
        loadingQuestions: { $set: action.payload },
      });
      return updatedState;
    }

    case types.questions: {
      const updatedState = update(state, {
        questions: { $set: action.payload },
      });
      return updatedState;
    }

    case types.questionsIdIndexMap: {
      const updatedState = update(state, {
        questionsIdIndexMap: { $set: action.payload },
      });
      return updatedState;
    }

    case types.categories: {
      const updatedState = update(state, {
        categories: { $set: action.payload },
      });
      return updatedState;
    }

    case types.categoriesIdIndexMap: {
      const updatedState = update(state, {
        categoriesIdIndexMap: { $set: action.payload },
      });
      return updatedState;
    }

    case types.activeQuestion: {
      const updatedState = update(state, {
        activeQuestion: { $set: action.payload },
      });
      return updatedState;
    }

    case types.activeCategoryId: {
      const updatedState = update(state, {
        activeCategoryId: { $set: action.payload },
      });
      return updatedState;
    }

    case types.reset:
    case types.logout: {
      return initialState;
    }
    default:
      return state;
  }
};
