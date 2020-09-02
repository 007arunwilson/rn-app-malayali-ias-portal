import * as axios from '../helpers/axios';

const login = ({ data }) =>
  new Promise((resolve, reject) => {
    axios.noAuth
      .request({
        url: '/auth/login',
        data,
        method: 'POST',
      })
      .then(
        (response) => {
          if (response.data && response.data.data && response.data.data[0]) {
            resolve(response.data.data[0]);
          } else {
            resolve(null);
          }
        },
        (error) => {
          reject(error);
        },
      );
  });

const socialMedia = ({ urlParam, data }) =>
  new Promise((resolve, reject) => {
    axios.noAuth
      .request({
        url: `/auth/social-media/${urlParam.provider}`,
        data,
        method: 'POST',
      })
      .then(
        ({ data: { data: responseData } }) => {
          if (responseData && responseData[0]) {
            resolve(responseData[0]);
          }
        },
        (error) => {
          reject(error);
        },
      );
  });

const refreshSession = ({ data }) =>
  new Promise((resolve, reject) => {
    axios.noAuth
      .request({
        url: '/auth/refresh-session',
        data,
        method: 'POST',
      })
      .then(
        ({ data: { data: responseData } }) => {
          if (responseData && responseData[0]) {
            resolve(responseData[0]);
          }
        },
        (error) => {
          reject(error);
        },
      );
  });

export { socialMedia, refreshSession, login };
