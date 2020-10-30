import * as types from '../../types/exam/detail';

const updateLoading = (payload) => (dispatch) =>
  dispatch({
    type: types.loading,
    payload,
  });

const updateData = (payload) => (dispatch) =>
  dispatch({
    type: types.data,
    payload,
  });

const reset = (payload) => (dispatch) =>
  dispatch({
    type: types.reset,
    payload,
  });

export { updateLoading, updateData, reset };
