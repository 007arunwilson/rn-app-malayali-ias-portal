import update from 'immutability-helper';
import * as types from '../../types/exam/detail';

const initialState = {
  loading: null,
  data: {
    id: null,
    testId: null,
    title: null,
    description: null,
    duration: null,
    totalScore: null,
    questionsCount: null,
    startedOn: null,
    submittedOn: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.loading: {
      const updatedState = update(state, {
        loading: { $set: action.payload },
      });
      return updatedState;
    }

    case types.data: {
      const updatedState = update(state, {
        data: {
          id: {
            $set: action.payload.id || state.data.id,
          },
          testId: {
            $set: action.payload.testId || state.data.testId,
          },
          title: {
            $set: action.payload.title || state.data.title,
          },
          description: {
            $set: action.payload.description || state.data.description,
          },
          duration: {
            $set: action.payload.duration || state.data.duration,
          },
          totalScore: {
            $set: Number(action.payload.totalScore) || state.data.totalScore,
          },
          questionsCount: {
            $set:
              Number(action.payload.questionsCount) ||
              state.data.questionsCount,
          },
          startedOn: {
            $set: action.payload.startedOn || state.data.startedOn,
          },
          submittedOn: {
            $set: action.payload.submittedOn || state.data.submittedOn,
          },
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
