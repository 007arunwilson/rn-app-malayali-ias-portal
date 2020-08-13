import * as authModel from '../../database/models/auth';

/** Update auth tokens to global variable and persistant storage */
const updateTokens = ({ accessToken, refreshToken }) =>
  new Promise((resolve) => {
    global.accessToken = accessToken;
    global.refreshToken = refreshToken;
    authModel.saveTokens({ accessToken, refreshToken }).then(resolve);
  });

export { updateTokens };
