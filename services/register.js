import * as axios from '../helpers/axios';
import * as helperUtils from '../helpers/utils';

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
  axios.noAuth
    .request({
      url: '/auth/app-verify-phone-otp',
      data,
      method: 'POST',
    })
    .then(helperUtils.parseApiResponse);

const isEmailPhoneUsernameUnique = ({ data }) =>
  axios.noAuth
    .request({
      url: '/auth/is-email-phone-username-unique',
      data,
      method: 'POST',
    })
    .then(helperUtils.parseApiResponse);

export { isEmailPhoneUsernameUnique, sendPhoneOtp, verifyPhoneOtp };
