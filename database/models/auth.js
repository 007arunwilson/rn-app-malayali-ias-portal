import AsyncStorage from '@react-native-community/async-storage';

const saveTokens = ({ accessToken, refreshToken }) =>
  new Promise((resolve) => {
    AsyncStorage.multiSet([
      ['@Auth.accessToken', accessToken],
      ['@Auth.refreshToken', refreshToken],
    ]).then(resolve);
  });

const getTokens = () =>
  new Promise((resolve) => {
    AsyncStorage.multiGet(['@Auth.accessToken', '@Auth.refreshToken']).then(
      (result) => {
        const results = {};
        result.map((item) => {
          results[item[0]] = item[1];
        });
        const tokens = {
          accessToken: results['@Auth.accessToken'],
          refreshToken: results['@Auth.refreshToken'],
        };
        resolve(tokens);
      },
    );
  });

export { saveTokens, getTokens };
