import { Navigation } from 'react-native-navigation';
import * as types from '../types/app';
import * as authApi from '../../services/auth';
import * as appApi from '../../services/app';
import * as authActions from '../actions/auth';
import * as onboardingActions from '../actions/onboarding';
import { navComponents } from '../../navigation';
import { appModel } from '../../database';

const updateActivePackageId = (payload) => (dispatch) =>
  dispatch({
    type: types.activePackageId,
    payload,
  });

const updateHomeScreenDataLoaded = (payload) => (dispatch) =>
  dispatch({
    type: types.homeScreenDataLoaded,
    payload,
  });

const updatesubscribedUser = (payload) => (dispatch) =>
  dispatch({
    type: types.subscribedUser,
    payload,
  });

/** process refresh token which saved in app
 *  by checking session is valid or else navigating to onboarding screen
 * */
const processRefreshToken = (payload) => (dispatch) => {
  authApi.refreshSession({ data: { refresh_token: payload } }).then(
    (result) => {
      const { accessToken, refreshToken } = result;
      const viaAction = 'launch';
      dispatch(
        onboardingActions.continueWithTokens({
          accessToken,
          refreshToken,
          viaAction,
        }),
      );
    },
    (error) => {
      if (error.response) {
        if (error.response.status === 403 || error.response.status === 401) {
          // need to delete refresh token here
          authActions.deleteTokens();
          Navigation.setRoot({
            root: navComponents.onboarding,
          });
        }
      }
    },
  );
};

/** process App lunch,
 *  whne app launches this action will trigger and do the followups
 * */
const processAppLaunch = () => (dispatch) => {
  appModel.getLaunchData().then((appLaunchData) => {
    const { refreshToken, activePackageId } = appLaunchData;

    if (activePackageId) {
      dispatch(updateActivePackageId(activePackageId));
    }

    if (refreshToken) {
      dispatch(processRefreshToken(refreshToken));
    } else {
      Navigation.setRoot({
        root: navComponents.onboarding,
      });
    }
  });
};

const populateHomeScreenData = () => (dispatch, getState) => {
  const state = getState();
  const { activePackageId } = state.app;
  if (!activePackageId) {
    const { userPackages } = state.user;
    const firstPackage = userPackages[0];
    if (firstPackage.is_default) {
      dispatch(updatesubscribedUser(false));
    }
    dispatch(updateActivePackageId(firstPackage.id));
  }
  dispatch(updatesubscribedUser(false));
  dispatch(updateHomeScreenDataLoaded(true));
};

export {
  processRefreshToken,
  processAppLaunch,
  populateHomeScreenData,
  updatesubscribedUser,
  updateHomeScreenDataLoaded,
};
