import { Navigation } from 'react-native-navigation';
import * as authApi from '../../services/auth';
import * as authActions from '../actions/auth';
import { navComponents } from '../../navigation';

/** process refresh token which saved in app
 *  by checking session is valid or else navigating to onboarding screen
 * */
const processRefreshToken = (payload) => (dispatch) => {
  const refreshToken = payload;
  authApi.refreshSession({ data: { refresh_token: refreshToken } }).then(
    (result) => {
      authActions.updateTokens({
        refreshToken: result.refresh_token,
        accessToken: result.access_token,
      });
    },
    (error) => {
      if (error.response.status === 403) {
        Navigation.setRoot({
          root: navComponents.obboarding,
        });
      }
    },
  );
};

export { processRefreshToken };
