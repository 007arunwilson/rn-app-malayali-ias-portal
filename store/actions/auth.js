import * as authModel from '../../database/models/auth';
import * as userAPi from '../../services/user';
import { Navigation } from 'react-native-navigation';
import { navComponents } from '../../navigation';

/** Update auth tokens to global variable and persistant storage */
const updateTokens = ({ accessToken, refreshToken }) =>
  new Promise((resolve) => {
    updateTokensToGlobal({ accessToken, refreshToken });
    authModel.saveTokens({ accessToken, refreshToken }).then(resolve);
  });

const updateTokensToGlobal = ({ accessToken, refreshToken }) => {
  global.accessToken = accessToken;
  global.refreshToken = refreshToken;
};

/**
 * Checking user have valid packgaes,
 * else continue to package subscription
 * */
const continueToPackages = () => (dispatch) => {
  userAPi.getUserPackages().then((userPackages) => {
    console.log('user packages');
    if (userPackages.length) {
      console.log('Have packages, proceed with courses');
    } else {
      Navigation.setRoot({
        root: navComponents.packageSelection,
      });
    }
  });
};

export { updateTokens, updateTokensToGlobal, continueToPackages };
