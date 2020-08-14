import * as types from '../types/onboarding';
import * as authActions from '../actions/auth';
import * as authApi from '../../services/auth';
import * as userAPi from '../../services/user';

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

/** Processing obboarding using facebook auth flow */
const proceedWithFacebook = (payload) => (dispatch) => {
  const urlParam = { provider: 'facebook' };
  const data = payload;
  authApi
    .socialMedia({ urlParam, data })
    .then(
      (result) => {
        const { accessToken, refreshToken } = result;
        return authActions.updateTokens({ accessToken, refreshToken });
      },
      (error) => { },
    )
    .then(() => {
      dispatch(continueToPackages());
    });
};

/** Processing obboarding using google auth flow */
const proceedWithGoogle = (payload) => (dispatch) => {
  const urlParam = { provider: 'google' };
  const data = payload;
  authApi
    .socialMedia({ urlParam, data })
    .then(
      (result) => {
        const { accessToken, refreshToken } = result;
        return authActions.updateTokens({ accessToken, refreshToken });
      },
      (error) => { },
    )
    .then(() => {
      dispatch(continueToPackages());
    });
};

const continueToPackages = () => (dispatch) => {
  userAPi.getUserPackages().then((userPackages) => {
    if (userPackages.length) {
      console.log('Have packages, proceed with courses');
    } else {
      console.log('To package selection');
    }
  });
};

export {
  updateInprogress,
  updateActiveStep,
  proceedWithFacebook,
  proceedWithGoogle,
};
