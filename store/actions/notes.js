import * as types from '../types/notes';
import * as notesApi from '../../services/notes';
import * as noteActions from '../actions/note';
import config from '../../config';
import { Navigation } from 'react-native-navigation';
import { bindPassProps, navComponents } from '../../navigation';

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

const loadNotes = (payload) => (dispatch, getState) => {
  const state = getState();
  const count = state.notes.count;
  const limit = state.notes.pagination.limit;
  const previousNotesByIndex = state.notes.byIndex;
  const activePackageId =
    config.env === 'local' ? 32 : state.app.activePackageId;
  const promises = [];
  const { page } = payload;

  if (count === null) {
    promises.push(
      notesApi.getPackageNotesCount({
        urlParams: { packageId: activePackageId },
      }),
    );
  } else {
    promises.push(Promise.resolve());
  }

  promises.push(
    notesApi.getPackageNotes({
      urlParams: { packageId: activePackageId },
      params: { page, limit },
    }),
  );

  dispatch(updateLoading(true));
  Promise.all(promises)
    .then(([packageNotesCount, packageNotes]) => {
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

const navigateToNote = (noteItem) => () => {
  Navigation.push('notes', bindPassProps({ noteItem }, navComponents.note));
};

export { loadNotes, navigateToNote };
