import { Navigation } from 'react-native-navigation';

// Importing Navigation components / screens
import launchScreen from './screens/launch';
import onboardingScreen from './screens/onboarding';

const registerComponents = () => {
  Navigation.registerComponent('nav.launch', () => launchScreen);
  Navigation.registerComponent('nav.onboarding', () => onboardingScreen);
};

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

navComponents.obboarding = {
  stack: {
    children: [
      {
        component: {
          id: 'launch',
          name: 'nav.onboarding',
          options: {
            topBar: {
              visible: false,
            },
          },
        },
      },
    ],
  },
};

export { navComponents, registerComponents };
