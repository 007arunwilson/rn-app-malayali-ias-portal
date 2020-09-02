// import update from 'immutability-helper';
import * as types from '../types/user';
import * as appTypes from '../types/app';

const initialState = null;

const userState = {
  name: null,
  email: null,
  phone: null,
  userPackages: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.update: {
      const updatedState = { ...userState, ...action.payload };
      return updatedState;
    }
    case appTypes.logout: {
      return initialState;
    }
    default:
      return state;
  }
};
