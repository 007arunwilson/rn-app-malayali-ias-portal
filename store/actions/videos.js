import * as types from '../types/videos';
import * as videosApi from '../../services/videos';
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

const loadVideos = (payload) => (dispatch, getState) => {
  const state = getState();
  const count = state.videos.count;
  const limit = state.videos.pagination.limit;
  const activePackageId =
    config.env === 'local' ? 31 : state.app.activePackageId;
  const promises = [];
  const { page } = payload;

  if (count === null) {
    promises.push(
      videosApi.getPackageVideosCount({
        urlParams: { packageId: activePackageId },
      }),
    );
  } else {
    promises.push(Promise.resolve());
  }

  promises.push(
    videosApi.getPackageVideos({
      urlParams: { packageId: activePackageId },
      params: { page, limit },
    }),
  );

  dispatch(updateLoading(true));
  Promise.all(promises)
    .then(([packageVideosCount, packageVideos]) => {
      if (typeof packageVideosCount !== 'undefined') {
        dispatch(updateCount(Number(packageVideosCount)));
      }
      dispatch(updateByIndex(packageVideos));
    })
    .catch((error) => error)
    .finally(() => dispatch(updateLoading(false)));
};

export { loadVideos };
