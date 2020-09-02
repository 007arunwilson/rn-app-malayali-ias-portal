import update from 'immutability-helper';
import * as types from '../types/app';

const initialState = {
  activePackageId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.activePackageId: {
      const updatedState = update(state, {
        activePackageId: { $set: action.payload },
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
