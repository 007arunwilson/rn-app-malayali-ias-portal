import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

// Importing redux store
import { store } from './store';

// Importing Navigation components / screens
import launchScreen from './screens/launch';
import onboardingScreen from './screens/onboarding';

// Ceating Provider compoenent ( Redux wrapper component )
const ReduxProvider = (Component, ReduxStore) => {
  return (props) => (
    <Provider store={ReduxStore}>
      <Component {...props} />
    </Provider>
  );
};

const registerComponents = () => {
  Navigation.registerComponent('nav.launch', () => launchScreen);
  Navigation.registerComponent(
    'nav.onboarding',
    () => ReduxProvider(onboardingScreen, store),
    () => onboardingScreen,
  );
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
