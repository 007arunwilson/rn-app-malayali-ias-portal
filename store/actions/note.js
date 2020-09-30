import * as types from '../types/note';
import * as noteApi from '../../services/note';

const updateLoading = (payload) => (dispatch) =>
  dispatch({
    type: types.loading,
    payload,
  });

const updateUri = (payload) => (dispatch) =>
  dispatch({
    type: types.uri,
    payload,
  });

const loadNote = (noteItem) => (dispatch) => {
  console.log('noteItem:', noteItem);
  dispatch(updateLoading(true));
  noteApi
    .getNoteDownloadLink({
      urlParams: { learningMaterialId: noteItem.learning_material_id },
    })
    .then((result) => {
      dispatch(updateUri(result));
      dispatch(updateLoading(false));
    });
};

export { loadNote };
