import * as types from '../types/exams';
import * as examsApi from '../../services/exams';
import config from '../../config';

const updateCount = (payload) => (dispatch) =>
  dispatch({
    type: types.count,
    payload,
  });

const updateLoading = (payload) => (dispatch) =>
  dispatch({
    type: types.loading,
    payload,
  });

const updateByIndex = (payload) => (dispatch) =>
  dispatch({
    type: types.byIndex,
    payload,
  });

const updatePaginationPage = (payload) => (dispatch) =>
  dispatch({
    type: types.paginationPage,
    payload,
  });

const loadExams = (payload) => (dispatch, getState) => {
  const state = getState();
  const count = state.exams.count;
  const limit = state.exams.pagination.limit;
  const activePackageId =
    config.env === 'local' ? 31 : state.app.activePackageId;
  const promises = [];
  const { page } = payload;

  if (count === null) {
    promises.push(
      examsApi.getPackageExamsCount({
        urlParams: { packageId: activePackageId },
      }),
    );
  } else {
    promises.push(Promise.resolve());
  }

  promises.push(
    examsApi.getPackageExamsWithUserAttempt({
      urlParams: { packageId: activePackageId },
      params: { page, limit },
    }),
  );

  dispatch(updateLoading(true));
  Promise.all(promises)
    .then(([packageExamsCount, packageExamsWithUserAttempt]) => {
      if (typeof packageExamsCount !== 'undefined') {
        dispatch(updateCount(Number(packageExamsCount)));
      }
      dispatch(updateByIndex(packageExamsWithUserAttempt));
    })
    .catch((error) => error)
    .finally(() => dispatch(updateLoading(false)));
};

export { loadExams };
