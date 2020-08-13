import AsyncStorage from '@react-native-community/async-storage';

const getLaunchData = () =>
  new Promise((resolve) => {
    AsyncStorage.multiGet([
      '@App.firebaseToken',
      '@Auth.accessToken',
      '@Auth.refreshToken',
      '@App.user',
    ]).then((result) => {
      const results = {};
      result.map((item) => {
        results[item[0]] = item[1];
      });
      const launchData = {
        firebaseToken: results['@App.firebaseToken'],
        accessToken: results['@Auth.accessToken'],
        refreshToken: results['@Auth.refreshToken'],
        user: results['@App.user'] ? JSON.parse(results['@App.user']) : null,
      };
      resolve(launchData);
    });
  });

const saveFirebaseToken = (firebaseToken) =>
  AsyncStorage.setItem('@App.firebaseToken', firebaseToken);

export { getLaunchData, saveFirebaseToken };
