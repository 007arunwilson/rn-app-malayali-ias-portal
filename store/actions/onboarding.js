import * as types from '../types/onboarding';

const updateInprogress = (payload) => (dispatch) =>
  dispatch({
    type: types.inProgress,
    payload,
  });

export { updateInprogress };
