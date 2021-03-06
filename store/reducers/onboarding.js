import update from 'immutability-helper';
import * as types from '../types/onboarding';
import * as appTypes from '../types/app';

const initialState = {
  inProgress: false,
  /**
   * activeStep description
   * null, 'CREATING_ACCOUNT', 'CREATING_SESSION'
   * */
  activeStep: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.inProgress: {
      const updatedState = update(state, {
        inProgress: { $set: action.payload },
      });
      return updatedState;
    }
    case types.activeStep: {
      const updatedState = update(state, {
        activeStep: { $set: action.payload },
      });
      return updatedState;
    }
    case appTypes.logout: {
      return initialState;
    }
    default:
      return state;
  }
};
