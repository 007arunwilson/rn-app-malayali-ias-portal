import { Navigation } from 'react-native-navigation';
import * as types from '../types/app';
import * as authApi from '../../services/auth';
import * as packagesApi from '../../services/packages';
import * as authActions from '../actions/auth';
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
  let { activePackageId } = state.app;
  let isSubscribedUser = true;
  if (!activePackageId) {
    const { userPackages } = state.user;
    isSubscribedUser = !(
      userPackages.length === 1 && userPackages[0].is_default
    );
    activePackageId = userPackages[0].id;
    dispatch(updateActivePackageId(activePackageId));
  }
  dispatch(updatesubscribedUser(isSubscribedUser));

  Promise.all([
    new Promise((resolve) => {
      masterActions
        .getCstItems()
        .then(masterActions.prepareDispatchObject)
        .then(({ byTypeValue, byParentId }) => {
          console.log('{ byTypeValue, byParentId }', {
            byTypeValue,
            byParentId,
          });
          dispatch(masterActions.updateCstItemsByParentId(byParentId));
          dispatch(masterActions.updateCstItemsByTypeValue(byTypeValue));
        })
        .then(resolve);
    }),
    new Promise((resolve) => {
      packagesApi
        .getPackagesCstItemIdsOfCourse({
          urlParams: { packageId: activePackageId },
        })
        .then((result) => {
          dispatch(updateActivePackageCstItemIds(result));
        })
        .then(resolve);
    }),
  ]).then(() => dispatch(updateHomeScreenDataLoaded(true)));
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
