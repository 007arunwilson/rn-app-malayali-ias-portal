import * as types from '../types/notes';
import * as notesApi from '../../services/notes';
import config from '../../config';
import { Navigation } from 'react-native-navigation';
import { bindPassProps, navComponents } from '../../navigation';

const reset = () => (dispatch) =>
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

const loadNotes = (payload) => (dispatch, getState) => {
  const { page, updateCount: isUpdateCount, cstItemId } = payload;
  dispatch(updateLoading(true));
  if (isUpdateCount) {
    dispatch(updateByIndex(null));
  }

  const state = getState();
  const count = state.notes.count;
  const limit = state.notes.pagination.limit;
  const filterDataCstItemIds = state.videos.filterData.cstItemIds;
  const previousNotesByIndex = state.notes.byIndex;
  const activePackageId =
    config.env === 'local'
      ? 32 || state.app.activePackageId
      : state.app.activePackageId;
  const promises = [];

  if (filterDataCstItemIds === null) {
    promises.push(
      notesApi.getFilterDataCstItemIds({
        urlParams: { packageId: activePackageId },
      }),
    );
  } else {
    promises.push(Promise.resolve());
  }

  if (count === null || isUpdateCount) {
    promises.push(
      notesApi.getPackageNotesCount({
        urlParams: { packageId: activePackageId },
        params: { cstItemIds: cstItemId && [cstItemId] },
      }),
    );
  } else {
    promises.push(Promise.resolve());
  }

  promises.push(
    notesApi.getPackageNotes({
      urlParams: { packageId: activePackageId },
      params: { page, limit, cstItemIds: cstItemId && [cstItemId] },
    }),
  );

  Promise.all(promises)
    .then(([filterDataCstItemIds, packageNotesCount, packageNotes]) => {
      const lastestState = getState();
      if (!lastestState.notes.loading) {
        return;
      } // Component unmounted and loading reset to false.

      if (typeof filterDataCstItemIds !== 'undefined') {
        dispatch(updateFilterDataCstItemIds(filterDataCstItemIds));
      }

      if (typeof packageNotesCount !== 'undefined') {
        dispatch(updateCount(Number(packageNotesCount)));
      }
      let updatedNotesByIndex = packageNotes;
      if (previousNotesByIndex) {
        updatedNotesByIndex = [...previousNotesByIndex, ...updatedNotesByIndex];
      }
      dispatch(updateByIndex(updatedNotesByIndex));
      dispatch(updatePaginationPage(page));
    })
    .catch((error) => error)
    .finally(() => dispatch(updateLoading(false)));
};

const navigateToNote = ({ noteItem, navigation }) => () => {
  Navigation.push(
    navigation.from,
    bindPassProps({ noteItem }, navComponents.note),
  );
};

export { loadNotes, navigateToNote, reset };
