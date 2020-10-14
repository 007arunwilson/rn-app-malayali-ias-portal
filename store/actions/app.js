import { Navigation } from 'react-native-navigation';
import * as types from '../types/app';
import * as authApi from '../../services/auth';
import * as userApi from '../../services/user';
import * as packagesApi from '../../services/packages';
import * as authActions from '../actions/auth';
import * as userActions from '../actions/user';
import * as packageSelectionActions from '../actions/packageSelecton';
import * as homeActions from '../actions/home';
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
      const {
        activePackage: { id: previousActivePackageId },
      } = state.app;
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
        Navigation.setRoot({
          root: {
            stack: {
              children: [navComponents.packageSelection],
            },
          },
        });
        return;
      } else if (!subscribedPackageMatchedToPrevious) {
        dispatch(setActivePackageId(result[0].package_id));
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
  authActions.deleteTokens().then(() => {
    Navigation.setRoot({ root: navComponents.onboarding }).then(() => {
      dispatch({
        type: types.logout,
      });
    });
  });
};

export {
  updateActivePackageId,
  processRefreshToken,
  processAppLaunch,
  populateHomeScreenData,
  updatesubscribedUser,
  updateHomeScreenDataLoaded,
  updateFilterMenuToggled,
  processLogout,
  updateActivePackageCategoriesByLearningMaterialNotesByIndex,
};
