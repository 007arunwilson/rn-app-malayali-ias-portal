import * as types from '../types/packageSelection';
import * as appActions from '../actions/app';
import * as packagesApi from '../../services/packages';

const updateIsLoading = (payload) => (dispatch) =>
  dispatch({
    type: types.isLoading,
    payload,
  });

const updatePackages = (payload) => (dispatch) =>
  dispatch({
    type: types.packages,
    payload,
  });

const loadPackages = () => (dispatch) => {
  dispatch(updateIsLoading(true));

  packagesApi.getPackages().then((packages) => {
    dispatch(updateIsLoading(false));
    dispatch(updatePackages(packages));
  });
};

const processPackageSelection = (payload) => (dispatch, getState) =>
  new Promise((resolve) => {
    const state = getState();
    console.log('state:', state);
    const { id: currentActivePackageId } = state.app.activePackage;
    if (payload !== currentActivePackageId) {
      dispatch(appActions.updateActivePackageId(payload));
    }

    packagesApi
      .getPackagesCategoriesByLearningMaterialType({
        urlParams: { packageId: currentActivePackageId, typeValue: 3 },
      })
      .then((result) => {
        dispatch(
          appActions.updateActivePackageCategoriesByLearningMaterialNotesByIndex(
            result,
          ),
        );
        resolve();
      });
  });

export { loadPackages, processPackageSelection };
