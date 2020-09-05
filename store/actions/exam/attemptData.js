import * as types from '../../types/exam/attemptData';

const update = (payload) => (dispatch) =>
  dispatch({
    type: types.update,
    payload,
  });

const reset = (payload) => (dispatch) =>
  dispatch({
    type: types.reset,
    payload,
  });

export { update, reset };
