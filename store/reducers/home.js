import update from 'immutability-helper';
import * as appTypes from '../types/app';
import * as types from '../types/home';

const initialState = {
  packageTopMostParentCategories: {
    loading: false,
    byIndex: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.packageTopMostParentCategoriesLoading: {
      const updatedState = update(state, {
        packageTopMostParentCategories: { loading: { $set: action.payload } },
      });
      return updatedState;
    }

    case types.packageTopMostParentCategoriesbyIndex: {
      const updatedState = update(state, {
        packageTopMostParentCategories: { byIndex: { $set: action.payload } },
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
