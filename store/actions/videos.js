import * as types from '../types/videos';
import * as videosApi from '../../services/videos';
import config from '../../config';

const reset = (payload) => (dispatch) =>
  dispatch({
    type: types.reset,
  });

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

const updateFilterDataCstItemIds = (payload) => (dispatch) =>
  dispatch({
    type: types.filterDataCstItemIds,
    payload,
  });

const loadVideos = (payload) => (dispatch, getState) => {
  const { page, updateCount: isUpdateCount, cstItemId } = payload;
  dispatch(updateLoading(true));
  if (isUpdateCount) {
    dispatch(updateByIndex(null));
  }

  const state = getState();
  const count = state.videos.count;
  const limit = state.videos.pagination.limit;
  const filterDataCstItemIds = state.videos.filterData.cstItemIds;
  const previousVideosByIndex = state.videos.byIndex;
  const activePackageId =
    config.env === 'local' ? 30 : state.app.activePackageId;
  const promises = [];

  if (filterDataCstItemIds === null) {
    promises.push(
      videosApi.getFilterDataCstItemIds({
        urlParams: { packageId: activePackageId },
      }),
    );
  } else {
    promises.push(Promise.resolve());
  }

  if (count === null || isUpdateCount) {
    promises.push(
      videosApi.getPackageVideosCount({
        urlParams: { packageId: activePackageId },
        params: { cstItemIds: cstItemId && [cstItemId] },
      }),
    );
  } else {
    promises.push(Promise.resolve());
  }

  promises.push(
    videosApi.getPackageVideos({
      urlParams: { packageId: activePackageId },
      params: { page, limit, cstItemIds: cstItemId && [cstItemId] },
    }),
  );

  Promise.all(promises)
    .then(([filterDataCstItemIds, packageVideosCount, packageVideos]) => {
      const lastestState = getState();
      if (!lastestState.videos.loading) return; // Component unmounted and loading reset to false.

      if (typeof filterDataCstItemIds !== 'undefined') {
        dispatch(updateFilterDataCstItemIds(filterDataCstItemIds));
      }

      if (typeof packageVideosCount !== 'undefined') {
        console.log('packageVideosCount:', packageVideosCount);
        dispatch(updateCount(Number(packageVideosCount)));
      }
      let updatedVideosByIndex = packageVideos;
      if (previousVideosByIndex) {
        updatedVideosByIndex = [
          ...previousVideosByIndex,
          ...updatedVideosByIndex,
        ];
      }
      dispatch(updateByIndex(updatedVideosByIndex));
      dispatch(updatePaginationPage(page));
    })
    .catch((error) => console.log(error))
    .finally(() => dispatch(updateLoading(false)));
};

export { loadVideos, reset };
