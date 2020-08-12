import update from 'immutability-helper';
import * as types from '../types/onboarding';

const initialState = {
  inProgress: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.inProgress: {
      const updatedState = update(state, {
        inProgress: { $set: action.payload },
      });
      return updatedState;
    }
    default:
      return state;
  }
};
