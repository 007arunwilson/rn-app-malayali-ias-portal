import update from 'immutability-helper';
import * as types from '../types/subscription';
import * as appTypes from '../types/app';

const initialState = {
  selectedSubscription: null,
  havePaidSubscription: true,
  availableSubscriptions: {
    byIndex: null,
    loading: false,
  },
  userSubscriptionsPackageActive: {
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
    case types.userSubscriptionsPackageActiveByIndex: {
      const updatedState = update(state, {
        userSubscriptionsPackageActive: { byIndex: { $set: action.payload } },
      });
      return updatedState;
    }
    case types.userSubscriptionsPackageActiveLoading: {
      const updatedState = update(state, {
        userSubscriptionsPackageActive: { loading: { $set: action.payload } },
      });
      return updatedState;
    }
    case types.selectedSubscription: {
      const updatedState = update(state, {
        selectedSubscription: { $set: action.payload },
      });
      return updatedState;
    }
    case types.havePaidSubscription: {
      const updatedState = update(state, {
        havePaidSubscription: { $set: action.payload },
      });
      return updatedState;
    }

    case appTypes.reset:
    case appTypes.logout: {
      return initialState;
    }
    default:
      return state;
  }
};
