import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

// Importing redux store
import { store } from './store';

// Importing Navigation components / screens
import launchScreen from './screens/launch';
import onboardingScreen from './screens/onboarding';
import packageSelection from './screens/packageSelection';

// Ceating Provider compoenent ( Redux wrapper component )
const ReduxProvider = (Component, ReduxStore) => {
  return (props) => (
    <Provider store={ReduxStore}>
      <Component {...props} />
    </Provider>
  );
};

const registerComponents = () => {
  Navigation.registerComponent(
    'nav.launch',
    () => ReduxProvider(launchScreen, store),
    () => launchScreen,
  );
  Navigation.registerComponent(
    'nav.onboarding',
    () => ReduxProvider(onboardingScreen, store),
    () => onboardingScreen,
  );
  Navigation.registerComponent(
    'nav.packageSelection',
    () => ReduxProvider(packageSelection, store),
    () => packageSelection,
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
          id: 'onboarding',
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

navComponents.packageSelection = {
  stack: {
    children: [
      {
        component: {
          id: 'packageSelection',
          name: 'nav.packageSelection',
          options: {
            topBar: {
              title: {
                text: 'Select Package',
              },
            },
          },
        },
      },
    ],
  },
};

export { navComponents, registerComponents };
