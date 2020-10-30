import * as types from '../types/home';
// import * as noteApi from '../../services/note';

const updatePackageTopMostParentCategoriesLoading = (payload) => (dispatch) =>
  dispatch({
    type: types.packageTopMostParentCategoriesLoading,
    payload,
  });

const updatePackageTopMostParentCategoriesByIndex = (payload) => (dispatch) =>
  dispatch({
    type: types.packageTopMostParentCategoriesbyIndex,
    payload,
  });

export {
  updatePackageTopMostParentCategoriesLoading,
  updatePackageTopMostParentCategoriesByIndex,
};
