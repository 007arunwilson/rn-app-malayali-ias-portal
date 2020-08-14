import * as authModel from '../../database/models/auth';

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

export { updateTokens, updateTokensToGlobal };
