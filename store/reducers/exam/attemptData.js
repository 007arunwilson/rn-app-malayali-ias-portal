import update from 'immutability-helper';
import * as types from '../../types/exam/attemptData';

const initialState = {
  startedOn: null,
  submittedOn: null,
  answeredQuestion: null,
  rightlyAnswered: null,
  totalScore: null,
  rightlyAnsweredScore: null,
  wronglyAnswered: null,
  negativeScore: null,
  optainedScore: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.loading: {
      const updatedState = update(state, {
        loading: { $set: action.payload },
      });
      return updatedState;
    }

    case types.update: {
      const updatedState = update(state, {
        startedOn: {
          $set: action.payload.startedOn || state.startedOn,
        },
        submittedOn: {
          $set: action.payload.submittedOn || state.submittedOn,
        },
        answeredQuestion: {
          $set:
            Number(action.payload.answeredQuestion) || state.answeredQuestion,
        },
        rightlyAnswered: {
          $set: Number(action.payload.rightlyAnswered) || state.rightlyAnswered,
        },
        totalScore: {
          $set: Number(action.payload.totalScore) || state.totalScore,
        },
        rightlyAnsweredScore: {
          $set:
            Number(action.payload.rightlyAnsweredScore) ||
            state.rightlyAnsweredScore,
        },
        wronglyAnswered: {
          $set: Number(action.payload.wronglyAnswered) || state.wronglyAnswered,
        },
        negativeScore: {
          $set: Number(action.payload.negativeScore) || state.negativeScore,
        },
        optainedScore: {
          $set: Number(action.payload.optainedScore) || state.optainedScore,
        },
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
