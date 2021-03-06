import { Navigation } from 'react-native-navigation';
import * as types from '../types/app';
import * as authApi from '../../services/auth';
import * as userApi from '../../services/user';
import * as authActions from '../actions/auth';
import * as userActions from '../actions/user';
import * as subscriptionActions from './subscription';
import * as packageSelectionActions from '../actions/packageSelecton';
import * as onboardingActions from '../actions/onboarding';
import { navComponents } from '../../navigation';
import { appModel } from '../../database';

const updateActivePackageId = (payload) => (dispatch) =>
  dispatch({
    type: types.activePackageId,
    payload,
  });

const updateActivePackageCategoriesByLearningMaterialNotesByIndex = (
  payload,
) => (dispatch) =>
  dispatch({
    type: types.activePackageCategoriesByLearningMaterialNotesByIndex,
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

const deleteActivePackageId = () =>
  new Promise((resolve) => {
    appModel.deleteActivePackageId().then(resolve);
  });

/** process refresh token which saved in app
 *  by checking session is valid or else navigating to onboarding screen
 * */
const processRefreshToken = (payload) => (dispatch) => {
  authApi.refreshSession({ data: { refresh_token: payload } }).then(
    (result) => {
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
      } = result.data;
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
  dispatch(subscriptionActions.loadHavePaidSubscription());
  userApi.getUserSubscriptionsActive().then((result) => {
    dispatch(
      subscriptionActions.updateUserSubscriptionsPackageActiveByIndex(result),
    );
    if (result.length) {
      dispatch(userActions.updateActiveSubscriptionsByIndex(result));
      const {
        activePackage: { id: previousActivePackageId },
      } = state.app;
      let subscribedPackageMatchedToPrevious = null;
      const uniquePackageIds = [];
      result.forEach((item) => {
        if (uniquePackageIds.indexOf(item.package_id) === -1) {
          uniquePackageIds.push(item.package_id);
        }
      });

      uniquePackageIds.forEach(
        // Getting previous selected packageId matched to user Subscribed package id
        (packageId) => {
          if (
            !subscribedPackageMatchedToPrevious &&
            packageId === previousActivePackageId
          ) {
            subscribedPackageMatchedToPrevious = packageId;
          }
        },
      );

      if (!subscribedPackageMatchedToPrevious && uniquePackageIds.length > 1) {
        Navigation.setRoot({
          root: {
            stack: {
              children: [navComponents.packageSelection],
            },
          },
        });
        return;
      } else if (!subscribedPackageMatchedToPrevious) {
        dispatch(setActivePackageId(uniquePackageIds[0]));
      }
      // Continue to selected package content population
      const { id: activePackageId } = getState().app.activePackage;
      dispatch(
        packageSelectionActions.processPackageSelection(activePackageId),
      ).then(() => {
        dispatch(updateHomeScreenDataLoaded(true));
      });
    } else {
      Navigation.setRoot({
        root: {
          stack: {
            children: [navComponents.subscribe],
          },
        },
      });
    }
  });
};

const processLogout = () => (dispatch) => {
  Promise.all([authActions.deleteTokens(), deleteActivePackageId()]).then(
    () => {
      Navigation.setRoot({ root: navComponents.onboarding }).then(() => {
        dispatch({
          type: types.logout,
        });
      });
    },
  );
};

export {
  updateActivePackageId,
  processRefreshToken,
  processAppLaunch,
  populateHomeScreenData,
  updatesubscribedUser,
  updateHomeScreenDataLoaded,
  updateFilterMenuToggled,
  setActivePackageId,
  processLogout,
  updateActivePackageCategoriesByLearningMaterialNotesByIndex,
};
