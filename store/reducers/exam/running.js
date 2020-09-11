import update from 'immutability-helper';
import * as types from '../../types/exam/running';
import * as appTypes from '../../types/app';

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
  haveNextQuestion: false,
  havePreviousQuestion: false,
  activeQuestionIndex: null,
  ready: false,
  saving: false,
  isReview: false,
  reviewQuestionsChoosedOptions: {},
  reviewQuestionsAnswerOptionIds: {},
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

    case types.activeQuestionIndex: {
      const updatedState = update(state, {
        activeQuestionIndex: { $set: action.payload },
      });
      return updatedState;
    }

    case types.activeCategoryId: {
      const updatedState = update(state, {
        activeCategoryId: { $set: action.payload },
      });
      return updatedState;
    }

    case types.haveNextQuestion: {
      const updatedState = update(state, {
        haveNextQuestion: { $set: action.payload },
      });
      return updatedState;
    }

    case types.havePreviousQuestion: {
      const updatedState = update(state, {
        havePreviousQuestion: { $set: action.payload },
      });
      return updatedState;
    }

    case types.questionsChoosedOptionIds: {
      const updatedState = update(state, {
        questionsChoosedOptionIds: { $set: action.payload },
      });
      return updatedState;
    }

    case types.timer: {
      const updatedState = update(state, {
        timer: { $set: action.payload },
      });
      return updatedState;
    }

    case types.saving: {
      const updatedState = update(state, {
        saving: { $set: action.payload },
      });
      return updatedState;
    }

    case types.isReview: {
      const updatedState = update(state, {
        isReview: { $set: action.payload },
      });
      return updatedState;
    }

    case types.reviewQuestionsChoosedOptions: {
      const updatedState = update(state, {
        reviewQuestionsChoosedOptions: { $set: action.payload },
      });
      return updatedState;
    }

    case types.reviewQuestionsAnswerOptionIds: {
      const updatedState = update(state, {
        reviewQuestionsAnswerOptionIds: { $set: action.payload },
      });
      return updatedState;
    }

    case types.ready: {
      const updatedState = update(state, {
        ready: { $set: action.payload },
      });
      return updatedState;
    }

    case types.reset:
    case appTypes.logout: {
      return initialState;
    }
    default:
      return state;
  }
};
