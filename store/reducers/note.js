import update from 'immutability-helper';
import * as appTypes from '../types/app';
import * as types from '../types/note';

const initialState = {
  loading: false,
  uri: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.loading: {
      const updatedState = update(state, {
        loading: { $set: action.payload },
      });
      return updatedState;
    }

    case types.uri: {
      const updatedState = update(state, {
        uri: { $set: action.payload },
      });
      return updatedState;
    }

    case types.reset:
    case appTypes.logout: {
      return initialState;
    }
    default:
      return state;
  }
};
