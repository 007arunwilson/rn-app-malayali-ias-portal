import { getClassStandardsFromMaster } from '../../database/models/app';
import * as types from '../types/register';
import * as registerApi from '../../services/register';
import * as userActions from '../actions/user';
import * as authActions from '../actions/auth';
import { Navigation } from 'react-native-navigation';
import { navComponents } from '../../navigation';

const updateViaSocialAuth = (payload) => (dispatch) =>
  dispatch({
    type: types.viaSocialAuth,
    payload,
  });

const updateMemorizedForm = (payload) => (dispatch) =>
  dispatch({
    type: types.memorizedForm,
    payload,
  });

const isEmailValidByApi = (payload) =>
  registerApi.isEmailPhoneUsernameUnique({
    data: { email_or_phone_or_username: payload },
  });

const isPhoneValidByApi = (payload) =>
  registerApi.isEmailPhoneUsernameUnique({
    data: { email_or_phone_or_username: payload },
  });

const processRegister = (payload) => (dispatch) => {
  console.log('process register payload', payload);
  dispatch(updateMemorizedForm(payload));
  const { phone } = payload;
  sendOtp({ phone });
  Navigation.push('onboarding', navComponents.verifyOtp);
};

const createAccount = () => (dispatch, getState) => {
  const state = getState();
  new Promise((resolve) => {
    if (state.register.viaSocialAuth) {
      resolve();
    } else {
      const { email, phone, password } = state.register.memorizedForm;
      userActions.createUser({ email, phone, password }).then(() => {
        authActions
          .login({ email_or_phone_or_username: email, password })
          .then((loginResult) => {
            const { accessToken, refreshToken } = loginResult;
            authActions
              .updateTokens({ accessToken, refreshToken })
              .then(resolve);
          });
      });
    }
  })
    .then(() => {
      const { name, password, email, phone } = state.register.memorizedForm;
      const updateProfileObj = { name };
      if (state.register.viaSocialAuth) {
        updateProfileObj.password = password;
        updateProfileObj.email = email;
        updateProfileObj.phone = phone;
      }
      return userActions.updateUserProfile(updateProfileObj);
    })
    .then(() => {
      dispatch(authActions.processLogin());
    });
};

const sendOtp = ({ phone }) => registerApi.sendPhoneOtp({ data: { phone } });

const verifyOtp = ({ phone, otp }) =>
  registerApi.verifyPhoneOtp({ data: { phone, otp } });

const getValidClassStandardsFromMaster = () =>
  new Promise((resolve) => {
    getClassStandardsFromMaster().then((result) => resolve(result));
  });

export {
  processRegister,
  getValidClassStandardsFromMaster,
  isEmailValidByApi,
  isPhoneValidByApi,
  sendOtp,
  verifyOtp,
  createAccount,
  updateMemorizedForm,
  updateViaSocialAuth,
};
