import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Importing reducers
import onboarding from './reducers/onboarding';
import app from './reducers/app';
import register from './reducers/register';
import user from './reducers/user';
import videos from './reducers/videos';
import exams from './reducers/exams';

const rootReducer = combineReducers({
  app,
  onboarding,
  register,
  user,
  videos,
  exams,
});

const composeEnhancers =
  (typeof window !== 'undefined' &&
    __DEV__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export { rootReducer, store };
