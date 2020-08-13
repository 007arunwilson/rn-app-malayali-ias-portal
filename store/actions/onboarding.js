import * as types from '../types/onboarding';
import * as authActions from '../actions/auth';
import * as authApi from '../../services/auth';

const updateInprogress = (payload) => (dispatch) =>
  dispatch({
    type: types.inProgress,
    payload,
  });

const updateActiveStep = (payload) => (dispatch) =>
  dispatch({
    type: types.activeStep,
    payload,
  });

const authFacebook = (payload) => (dispatch) => {
  const urlParam = { provider: 'facebook' };
  const data = payload;
  authApi.socialMedia({ urlParam, data }).then(
    (result) => {
      const { accessToken, refreshToken } = result;
      authActions.updateTokens({ accessToken, refreshToken });
    },
    (error) => { },
  );
};

export { updateInprogress, updateActiveStep, authFacebook };
