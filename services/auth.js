import * as axios from '../helpers/axios';
import * as helperUtils from '../helpers/utils';

const login = ({ data }) =>
  axios.noAuth
    .request({
      url: '/auth/login',
      data,
      method: 'POST',
    })
    .then(helperUtils.parseApiResponse);

const socialMedia = ({ urlParam, data }) =>
  new Promise((resolve, reject) => {
    axios.noAuth
      .request({
        url: `/auth/social-media/${urlParam.provider}`,
        data,
        method: 'POST',
      })
      .then(
        (response) => {
          if (response.data && response.data.data && response.data.data[0]) {
            resolve(response.data.data[0]);
          } else {
            reject(new Error('refresh session error'));
          }
        },
        (error) => {
          reject(error);
        },
      );
  });

const refreshSession = ({ data }) =>
  axios.noAuth
    .request({
      url: '/auth/refresh-session',
      data,
      method: 'POST',
    })
    .then(helperUtils.parseApiResponse);

const sendResetPasswordTokenEmail = ({ data }) =>
  new Promise((resolve, reject) => {
    axios.noAuth
      .request({
        url: '/auth/reset-password/send-token-email',
        data,
        method: 'POST',
      })
      .then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        },
      );
  });

const resetPasswordCreateNewPassword = ({ data }) =>
  new Promise((resolve, reject) => {
    axios.noAuth
      .request({
        url: '/auth/reset-password/create-new-password',
        data,
        method: 'POST',
      })
      .then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        },
      );
  });

export {
  socialMedia,
  refreshSession,
  login,
  sendResetPasswordTokenEmail,
  resetPasswordCreateNewPassword,
};
