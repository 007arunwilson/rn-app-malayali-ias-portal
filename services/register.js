import * as axios from '../helpers/axios';

const sendPhoneOtp = ({ data }) =>
  new Promise((resolve, reject) => {
    axios.noAuth
      .request({
        url: '/auth/app-send-phone-otp',
        data,
        method: 'POST',
      })
      .then(resolve, reject);
  });

const verifyPhoneOtp = ({ data }) =>
  new Promise((resolve, reject) => {
    axios.noAuth
      .request({
        url: '/auth/app-verify-phone-otp',
        data,
        method: 'POST',
      })
      .then(resolve, reject);
  });

const isEmailPhoneUsernameUnique = ({ data }) =>
  new Promise((resolve, reject) => {
    axios.noAuth
      .request({
        url: '/auth/is-email-phone-username-unique',
        data,
        method: 'POST',
      })
      .then(
        () => {
          resolve(true);
        },
        (error) => {
          resolve(false);
        },
      );
  });

export { isEmailPhoneUsernameUnique, sendPhoneOtp, verifyPhoneOtp };
