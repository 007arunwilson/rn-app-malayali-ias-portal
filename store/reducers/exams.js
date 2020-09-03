import update from 'immutability-helper';
import * as types from '../types/exams';

const initialState = {
  byIndex: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.loading: {
      const updatedState = update(state, {
        loading: { $set: action.payload },
      });
      return updatedState;
    }
    case types.byIndex: {
      const updatedState = update(state, {
        byIndex: { $set: action.payload },
      });
      return updatedState;
    }
    default:
      return state;
  }
};
