/**
 * @format
 */
import { Navigation } from 'react-native-navigation';
import messaging from '@react-native-firebase/messaging';

// Importing Navigation components / screens
import launchScreen from './screens/launch';

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
    .then((token) => {
      console.log('generaed firebase token', token);
    });

  messaging().onTokenRefresh((token) => {
    console.log('refreshed firebase token', token);
  });
})();

// Registering app screens
Navigation.registerComponent('nav.launch', () => launchScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: navComponents.root,
  });
});

// Navigation component declarations
const navComponents = {};

navComponents.root = {
  component: {
    id: 'launch',
    name: 'nav.launch',
    options: {
      topBar: {
        visible: false,
      },
    },
  },
};
