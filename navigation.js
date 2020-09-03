import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

// Importing redux store
import { store } from './store';

// Importing Navigation components / screens
import launchScreen from './screens/launch';
import onboardingScreen from './screens/onboarding';
import packageSelection from './screens/packageSelection';
import signinScreen from './screens/signin';
import registerScreen from './screens/register';
import verifyOtpScreen from './screens/verifyOtp';
import home from './screens/home';
import videos from './screens/videos';
import exams from './screens/exams';
import notes from './screens/notes';
import videoPlayer from './screens/videoPlayer';

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
  Navigation.registerComponent(
    'nav.signin',
    () => ReduxProvider(signinScreen, store),
    () => signinScreen,
  );
  Navigation.registerComponent(
    'nav.register',
    () => ReduxProvider(registerScreen, store),
    () => registerScreen,
  );
  Navigation.registerComponent(
    'nav.verifyOtp',
    () => ReduxProvider(verifyOtpScreen, store),
    () => verifyOtpScreen,
  );
  Navigation.registerComponent(
    'nav.home',
    () => ReduxProvider(home, store),
    () => home,
  );
  Navigation.registerComponent(
    'nav.videos',
    () => ReduxProvider(videos, store),
    () => videos,
  );
  Navigation.registerComponent(
    'nav.exams',
    () => ReduxProvider(exams, store),
    () => exams,
  );
  Navigation.registerComponent(
    'nav.notes',
    () => ReduxProvider(notes, store),
    () => notes,
  );
  Navigation.registerComponent(
    'nav.videoPlayer',
    () => ReduxProvider(videoPlayer, store),
    () => videoPlayer,
  );
};

const bindPassProps = (passProps, component) => {
  return {
    component: { ...component.component, passProps },
  };
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

navComponents.onboarding = {
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

navComponents.signin = {
  component: {
    id: 'signin',
    name: 'nav.signin',
  },
};

navComponents.register = {
  component: {
    id: 'register',
    name: 'nav.register',
  },
};

navComponents.verifyOtp = {
  component: {
    id: 'verifyOtp',
    name: 'nav.verifyOtp',
  },
};

navComponents.home = {
  stack: {
    children: [
      {
        component: {
          id: 'home',
          name: 'nav.home',
        },
      },
    ],
  },
};

navComponents.videos = {
  component: {
    id: 'videos',
    name: 'nav.videos',
  },
};

navComponents.exams = {
  component: {
    id: 'exams',
    name: 'nav.exams',
  },
};

navComponents.notes = {
  component: {
    id: 'notes',
    name: 'nav.notes',
  },
};

navComponents.videoPlayer = {
  component: {
    id: 'videoPlayer',
    name: 'nav.videoPlayer',
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

export { navComponents, registerComponents, bindPassProps };
