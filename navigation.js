import React from 'react';
import { Navigation } from 'react-native-navigation';
import { RNNDrawer } from 'react-native-navigation-drawer-extension';
import { Provider } from 'react-redux';

// Importing redux store
import { store } from './store';

// Importing Navigation components / screens
import launchScreen from './screens/launch';
import onboardingScreen from './screens/onboarding';
import packageSelection from './screens/packageSelection';
import subscribe from './screens/subscribe';
import subscribeSelection from './screens/subscribeSelection';
import activeSubscriptions from './screens/activeSubscriptions';
import signinScreen from './screens/signin';
import forgotPasswordStep1 from './screens/forgotPasswordStep1';
import forgotPasswordStep2 from './screens/forgotPasswordStep2';
import registerScreen from './screens/register';
import verifyOtpScreen from './screens/verifyOtp';
import home from './screens/home';
import videos from './screens/videos';
import exams from './screens/exams';
import notes from './screens/notes';
import videoPlayer from './screens/videoPlayer';
import examDetail from './screens/examDetail';
import examRunning from './screens/examRunning';
import note from './screens/note';
import topbarMenuIcon from './components/miscellaneous/topbarMenu';
import topbarFilterIcon from './components/miscellaneous/topbarFilterIcon';
import SidebarDefault from './components/miscellaneous/sidebarDefault';

// Ceating Provider compoenent ( Redux wrapper component )
const ReduxProvider = (Component, ReduxStore) => {
  return (props) => (
    <Provider store={ReduxStore}>
      <Component {...props} />
    </Provider>
  );
};

const registerComponents = () => {
  // Topbar Icons
  Navigation.registerComponent(
    'topbar.menuIcon',
    () => ReduxProvider(topbarMenuIcon, store),
    () => topbarMenuIcon,
  );

  Navigation.registerComponent(
    'topbar.filterIcon',
    () => ReduxProvider(topbarFilterIcon, store),
    () => topbarFilterIcon,
  );

  //Sidebar ( Default )
  Navigation.registerComponent(
    'sidebar.default',
    () =>
      ReduxProvider(
        RNNDrawer.create(() => <SidebarDefault />),
        store,
      ),
    () => RNNDrawer.create(() => <SidebarDefault />),
  );

  // Navigation Screens
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
    'nav.subscribe',
    () => ReduxProvider(subscribe, store),
    () => subscribe,
  );
  Navigation.registerComponent(
    'nav.activeSubscriptions',
    () => ReduxProvider(activeSubscriptions, store),
    () => activeSubscriptions,
  );
  Navigation.registerComponent(
    'nav.subscribeSelection',
    () => ReduxProvider(subscribeSelection, store),
    () => subscribeSelection,
  );
  Navigation.registerComponent(
    'nav.signin',
    () => ReduxProvider(signinScreen, store),
    () => signinScreen,
  );
  Navigation.registerComponent(
    'nav.forgotPasswordStep1',
    () => ReduxProvider(forgotPasswordStep1, store),
    () => forgotPasswordStep1,
  );
  Navigation.registerComponent(
    'nav.forgotPasswordStep2',
    () => ReduxProvider(forgotPasswordStep2, store),
    () => forgotPasswordStep2,
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
    'nav.note',
    () => ReduxProvider(note, store),
    () => note,
  );
  Navigation.registerComponent(
    'nav.videoPlayer',
    () => ReduxProvider(videoPlayer, store),
    () => videoPlayer,
  );
  Navigation.registerComponent(
    'nav.examDetail',
    () => ReduxProvider(examDetail, store),
    () => examDetail,
  );
  Navigation.registerComponent(
    'nav.examRunning',
    () => ReduxProvider(examRunning, store),
    () => examRunning,
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

navComponents.note = {
  component: {
    id: 'note',
    name: 'nav.note',
  },
};

navComponents.videoPlayer = {
  component: {
    id: 'videoPlayer',
    name: 'nav.videoPlayer',
  },
};

navComponents.examDetail = {
  component: {
    id: 'examDetail',
    name: 'nav.examDetail',
  },
};

navComponents.examRunning = {
  component: {
    id: 'examRunning',
    name: 'nav.examRunning',
  },
};

navComponents.forgotPasswordStep1 = {
  component: {
    id: 'forgotPasswordStep1',
    name: 'nav.forgotPasswordStep1',
  },
};

navComponents.forgotPasswordStep2 = {
  component: {
    id: 'forgotPasswordStep2',
    name: 'nav.forgotPasswordStep2',
  },
};

navComponents.subscribe = {
  component: {
    id: 'subscribe',
    name: 'nav.subscribe',
  },
};

navComponents.subscribeSelection = {
  component: {
    id: 'subscribeSelection',
    name: 'nav.subscribeSelection',
  },
};

navComponents.activeSubscriptions = {
  component: {
    id: 'activeSubscriptions',
    name: 'nav.activeSubscriptions',
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
