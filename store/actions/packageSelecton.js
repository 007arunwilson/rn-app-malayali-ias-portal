import * as types from '../types/packageSelection';
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

export { loadPackages };
