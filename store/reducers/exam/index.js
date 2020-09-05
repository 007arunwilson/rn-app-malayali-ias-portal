import { combineReducers } from 'redux';

import detail from './detail';
import attemptData from './attemptData';
// import running from './running';

const examReducer = combineReducers({
  detail,
  attemptData,
  // running,
});

export default examReducer;
