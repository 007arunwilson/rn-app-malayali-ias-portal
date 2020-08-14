import update from 'immutability-helper';
import * as types from '../types/packageSelection';

const initialState = {
  inProgress: false,
  packages: null,
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
