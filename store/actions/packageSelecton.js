import * as types from '../types/packageSelection';

const updateInprogress = (payload) => (dispatch) =>
  dispatch({
    type: types.inProgress,
    payload,
  });

export { updateInprogress };
