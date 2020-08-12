import * as types from '../types/onboarding';

const updateInprogress = (payload) => ({
  type: types.inProgress,
  payload,
});

const googleAuth = () => (dispatch) => {
  dispatch(updateInprogress(true));
};

export { googleAuth };
