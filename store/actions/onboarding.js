import { Navigation } from 'react-native-navigation';
import * as types from '../types/onboarding';
import * as authActions from '../actions/auth';
import * as registerActions from '../actions/register';
import * as authApi from '../../services/auth';
import * as userAPi from '../../services/user';
import { navComponents } from '../../navigation';

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
  authApi.socialMedia({ urlParam, data }).then(
    (result) => {
      const { accessToken, refreshToken } = result;
      dispatch(continueWithTokens({ accessToken, refreshToken }));
    },
    (error) => {},
  );
};

/** Processing obboarding using google auth flow */
const proceedWithGoogle = (payload) => (dispatch) => {
  const urlParam = { provider: 'google' };
  const data = payload;
  authApi.socialMedia({ urlParam, data }).then(
    (result) => {
      const { accessToken, refreshToken } = result;
      dispatch(continueWithTokens({ accessToken, refreshToken }));
    },
    (error) => {},
  );
};

const continueWithTokens = (payload) => (dispatch) => {
  const { accessToken, refreshToken, viaAction } = payload;
  authActions.updateTokens({ accessToken, refreshToken }).then(() => {
    userAPi.getUser().then((user) => {
      if (!user.email) {
        /**
         * If user don't have email (email is manadatory), then considering as incomplete profile creation.
         * from social login, so redirecting to register screen with collected fields from
         * social auth provider
         */

        // Setting memorized values for registration
        const { email, phone, profile_fields } = user;
        const name =
          profile_fields && profile_fields.name ? profile_fields.name : null;
        dispatch(registerActions.updateMemorizedForm({ email, phone, name }));
        dispatch(registerActions.updateViaSocialAuth(true));
        dispatch(updateInprogress(false));
        if (viaAction && viaAction === 'launch') {
          Navigation.setRoot({
            root: navComponents.onboarding,
          });
        } else {
          Navigation.push('onboarding', navComponents.register);
        }
      } else {
        dispatch(authActions.processLogin({ user }));
      }
    });
  });
};

// const continueToPackages = () => (dispatch) => {
//   userAPi.getUserPackages().then((userPackages) => {
//     if (userPackages.length) {
//       console.log('Have packages, proceed with courses');
//     } else {
//       Navigation.setRoot({
//         root: navComponents.packageSelection,
//       });
//     }
//   });
// };

export {
  updateInprogress,
  updateActiveStep,
  proceedWithFacebook,
  proceedWithGoogle,
  continueWithTokens,
};
