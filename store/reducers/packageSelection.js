import update from 'immutability-helper';
import * as types from '../types/packageSelection';

const initialState = {
  isLoading: false,
  packages: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.isLoading: {
      const updatedState = update(state, {
        isLoading: { $set: action.payload },
      });
      return updatedState;
    }
    case types.packages: {
      const updatedState = update(state, {
        packages: { $set: action.payload },
      });
      return updatedState;
    }
    default:
      return state;
  }
};
