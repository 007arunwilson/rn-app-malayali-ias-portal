import update from 'immutability-helper';
import * as types from '../types/subscribe';
import * as appTypes from '../types/app';

const initialState = {
  selectedSubscription: null,
  availableSubscriptions: {
    byIndex: null,
    loading: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.availableSubscriptionByIndex: {
      const updatedState = update(state, {
        availableSubscriptions: { byIndex: { $set: action.payload } },
      });
      return updatedState;
    }
    case types.availableSubscriptionLoading: {
      const updatedState = update(state, {
        availableSubscriptions: { loading: { $set: action.payload } },
      });
      return updatedState;
    }
    case types.selectedSubscription: {
      const updatedState = update(state, {
        selectedSubscription: { $set: action.payload },
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
