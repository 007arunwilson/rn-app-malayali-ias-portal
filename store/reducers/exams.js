import update from 'immutability-helper';
import * as types from '../types/exams';

const initialState = {
  byIndex: null,
  loading: false,
  count: null,
  pagination: {
    limit: 10,
    page: 1,
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
    case types.byIndex: {
      const updatedState = update(state, {
        byIndex: { $set: action.payload },
      });
      return updatedState;
    }
    case types.paginationPage: {
      const updatedState = update(state, {
        pagination: { page: { $set: action.payload } },
      });
      return updatedState;
    }
    case types.count: {
      const updatedState = update(state, {
        count: { $set: action.payload },
      });
      return updatedState;
    }
    default:
      return state;
  }
};
