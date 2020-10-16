import * as authModel from '../../database/models/auth';
import * as userAPi from '../../services/user';
import * as authAPi from '../../services/auth';
import * as userActions from '../actions/user';
import * as appActions from '../actions/app';
import { Navigation } from 'react-native-navigation';
import { navComponents } from '../../navigation';
import { appModel } from '../../database';

/** Update auth tokens to global variable and persistant storage */
const updateTokens = ({ accessToken, refreshToken }) =>
  new Promise((resolve) => {
    updateTokensToGlobal({ accessToken, refreshToken });
    authModel.saveTokens({ accessToken, refreshToken }).then(resolve);
  });

/** Delete auth tokens from global variable and persistant storage */
const deleteTokens = () =>
  new Promise((resolve) => {
    deleteTokensFromGlobal();
    authModel.deleteTokens().then(resolve);
  });

const updateTokensToGlobal = ({ accessToken, refreshToken }) => {
  global.accessToken = accessToken;
  global.refreshToken = refreshToken;
};

const deleteTokensFromGlobal = () => {
  global.accessToken = null;
  global.refreshToken = null;
};

const login = ({ email_or_phone_or_username, password }) =>
  authAPi.login({
    data: { email_or_phone_or_username, password },
  });

const sendResetPasswordTokenEmail = ({ email }) =>
  authAPi.sendResetPasswordTokenEmail({
    data: { email },
  });

const resetPasswordCreateNewPassword = ({ email, password, token }) =>
  authAPi.resetPasswordCreateNewPassword({
    data: { email, password, token },
  });

/**
 * process login action,
 * ( from different scenarios, from onabording, signin )
 * */
const processLogin = (payload) => (dispatch) => {
  new Promise((resolve) => {
    if (payload && payload.user) {
      resolve({ user: payload.user });
    } else {
      userAPi.getUser().then((user) => {
        resolve({ user });
      });
    }
  }).then(({ user }) => {
    const userObj = {
      email: user.email,
      phone: user.phone,
      name:
        user.profile_fields && user.profile_fields.name
          ? user.profile_fields.name
          : null,
    };
    dispatch(userActions.update(userObj));
    Navigation.setRoot({ root: navComponents.home });
  });
};

export {
  updateTokens,
  updateTokensToGlobal,
  processLogin,
  deleteTokens,
  login,
  sendResetPasswordTokenEmail,
  resetPasswordCreateNewPassword,
};
