import update from 'immutability-helper';
import * as types from '../types/register';
import * as appTypes from '../types/app';

const initialState = {
  viaSocialAuth: false,
  memorizedForm: {
    email: null,
    phone: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.memorizedForm: {
      const updatedState = update(state, {
        memorizedForm: { $set: action.payload },
      });
      return updatedState;
    }
    case types.viaSocialAuth: {
      const updatedState = update(state, {
        viaSocialAuth: { $set: action.payload },
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
