import update from 'immutability-helper';
import * as types from '../types/app';

const initialState = {
  subjects: null,
  subscribedSubjects: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.subjects: {
      const updatedState = update(state, {
        subjects: { $set: action.payload },
      });
      return updatedState;
    }
    case types.subscribedSubjects: {
      const updatedState = update(state, {
        subscribedSubjects: { $set: action.payload },
      });
      return updatedState;
    }
    case types.pushToSubscribedSubjects: {
      const updatedState = update(state, {
        subscribedSubjects: { $push: [action.payload] },
      });
      return updatedState;
    }
    case types.logout: {
      return initialState;
    }
    default:
      return state;
  }
};
