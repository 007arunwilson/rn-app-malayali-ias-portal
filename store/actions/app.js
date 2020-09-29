import { Navigation } from 'react-native-navigation';
import * as types from '../types/app';
import * as authApi from '../../services/auth';
import * as userApi from '../../services/user';
import * as packagesApi from '../../services/packages';
import * as authActions from '../actions/auth';
import * as userActions from '../actions/user';
import * as masterActions from '../actions/masters';
import * as onboardingActions from '../actions/onboarding';
import { navComponents } from '../../navigation';
import { appModel } from '../../database';

const updateActivePackageId = (payload) => (dispatch) =>
  dispatch({
    type: types.activePackageId,
    payload,
  });

const updateActivePackageCstItemIds = (payload) => (dispatch) =>
  dispatch({
    type: types.activePackageCstItemIds,
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

const updateFilterMenuToggled = (payload) => (dispatch) =>
  dispatch({
    type: types.filterMenuToggled,
    payload,
  });

const setActivePackageId = (payload) => (dispatch) => {
  dispatch(updateActivePackageId(payload));
  appModel.saveActivePackageId(payload);
};

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
  console.log('App launch');
  appModel.getLaunchData().then((appLaunchData) => {
    const { refreshToken, activePackageId } = appLaunchData;

    if (activePackageId) {
      dispatch(updateActivePackageId(Number(activePackageId))); // Converting to Number for easy comparison
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
  userApi.getUserSubscriptionsActive().then((result) => {
    if (result.length) {
      dispatch(userActions.updateActiveSubscriptionsByIndex(result));
      const { activePackageId: previousActivePackageId } = state.app;
      let subscribedPackageMatchedToPrevious = null;
      result.forEach(
        // Getting previous selected packageId matched to user Subscribed package id
        (userSubscription) => {
          if (
            !subscribedPackageMatchedToPrevious &&
            userSubscription.package_id === previousActivePackageId
          ) {
            subscribedPackageMatchedToPrevious = userSubscription.package_id;
          }
        },
      );

      if (!subscribedPackageMatchedToPrevious && result.length > 1) {
        console.log('redirect to multiple package selection');
        return;
      } else if (!subscribedPackageMatchedToPrevious) {
        dispatch(setActivePackageId(result[0].package_id));
        console.log('Set Active package Id');
      }
      // Continue to selected package content population
      console.log('Continue to selected package content population');
    } else {
      console.log('Redirecing to new package subscription');
    }
  });
};

const processLogout = () => (dispatch) => {
  authActions.deleteTokens().then(() => {
    Navigation.setRoot({ root: navComponents.onboarding }).then(() => {
      dispatch({
        type: types.logout,
      });
    });
  });
};

export {
  processRefreshToken,
  processAppLaunch,
  populateHomeScreenData,
  updatesubscribedUser,
  updateHomeScreenDataLoaded,
  updateFilterMenuToggled,
  processLogout,
};
