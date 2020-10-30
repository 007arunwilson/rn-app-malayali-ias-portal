import update from 'immutability-helper';
import * as types from '../types/app';

const initialState = {
  activePackage: {
    id: null,
    categoriesByLearningMaterial: {
      notes: {
        byIndex: null,
      },
    },
  },
  activePackageCstItemIds: null, // Courses only -
  subscribedUser: null,
  homeScreenDataLoaded: false,
  filterMenuToggled: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.activePackageId: {
      const updatedState = update(state, {
        activePackage: { id: { $set: action.payload } },
      });
      return updatedState;
    }

    case types.activePackageCategoriesByLearningMaterialNotesByIndex: {
      const updatedState = update(state, {
        activePackage: {
          categoriesByLearningMaterial: {
            notes: { byIndex: { $set: action.payload } },
          },
        },
      });
      return updatedState;
    }

    case types.activePackageCstItemIds: {
      const updatedState = update(state, {
        activePackageCstItemIds: { $set: action.payload },
      });
      return updatedState;
    }

    case types.subscribedUser: {
      const updatedState = update(state, {
        subscribedUser: { $set: action.payload },
      });
      return updatedState;
    }

    case types.homeScreenDataLoaded: {
      const updatedState = update(state, {
        homeScreenDataLoaded: { $set: action.payload },
      });
      return updatedState;
    }

    case types.filterMenuToggled: {
      const updatedState = update(state, {
        filterMenuToggled: { $set: action.payload },
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
