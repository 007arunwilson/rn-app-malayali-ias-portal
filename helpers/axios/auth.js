import axios from 'axios';
import config from '../../config';
import * as authModel from '../../database/models/auth';
import * as authActions from '../../store/actions/auth';
// import { refreshSession } from '../../services/auth';

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

/**
 * WIP,
 * ref : https://github.com/axios/axios/issues/934#issuecomment-322003342
 * https://github.com/axios/axios/issues/754
 *
 * Need to modify this to handle the failed access token, but follow up calls of refresh token
 * and re requesting the failed api call.
 */
auth.interceptors.response.use(
  (response) => response,
  (error) => error,
);
