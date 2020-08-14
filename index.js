/**
 * @format
 */
import { Navigation } from 'react-native-navigation';
import messaging from '@react-native-firebase/messaging';

// Import persistant storage
import { appModel } from './database';

// Importing Navigation methods
import { navComponents, registerComponents } from './navigation';
import { color } from './config';

// Initializing and configuring firebase
(async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    return;
  }

  messaging()
    .getToken()
    .then(
      (token) => {
        appModel.saveFirebaseToken(token);
      },
      (error) => {
        // Need to handle firebase getToken error
      },
    );

  messaging().onTokenRefresh((token) => {
    appModel.saveFirebaseToken(token);
  });
})();

// Registering app screens
registerComponents();

// Setting navigation global default options
Navigation.setDefaultOptions({
  topBar: {
    title: {
      color: color.white,
    },
    backButton: {
      color: color.white,
    },
    background: {
      color: color.primary,
    },
  },
});

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: navComponents.root,
  });
});
