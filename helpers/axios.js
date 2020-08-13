import axios from 'axios';
import config from '../config';
import * as authModel from '../database/models/auth';
import * as authActions from '../store/actions/auth';

const noAuth = axios.create({ baseURL: config.apiOrigin });
const auth = axios.create({ baseURL: config.apiOrigin });

auth.interceptors.request.use(
  (requestConfig) => {
    if (global.onSessionRefresh) {
      return new Promise((resolve) => {
        window.addEventListener('onSessionRefreshEnd', () => {
          const accessToken = global.accessToken;
          config.headers.Authorization = `Bearer ${accessToken}`;
          resolve(config);
        });
      });
    } else {
      const accessToken = global.accessToken;
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  },
  (error) => {
    Promise.reject(error);
  },
);

auth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.config && error.response && error.response.status === 401) {
      global.onSessionRefresh = true;
      return new Promise((resolve, reject) => {
        noAuth
          .request({
            url: '/auth/refresh-session',
            data: { refresh_token: global.refreshToken },
            method: 'POST',
          })
          .then(
            ({ data: { data: responseData } }) => {
              if (responseData && responseData[0]) {
                const {
                  refresh_token: refreshToken,
                  access_token: accessToken,
                } = responseData[0];
                authActions
                  .updateTokens({ refreshToken, accessToken })
                  .then(resolve);
              }
            },
            (refreshErr) => {
              // Handle session refresh failure
              reject(refreshErr);
            },
          );
      });
    }
    return Promise.reject(error);
  },
);

export { noAuth };
