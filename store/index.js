import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Importing reducers
import onboarding from './reducers/onboarding';
import packageSelection from './reducers/packageSelection';

const rootReducer = combineReducers({
  onboarding,
  packageSelection,
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
