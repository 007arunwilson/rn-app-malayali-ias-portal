/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { color } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import * as notesActions from '../../store/actions/notes';
import FullscreenLoader from '../../components/miscellaneous/fullscreenLoader';
import FullscreenEmptyList from '../../components/miscellaneous/fullscreenEmptyList';

import { Navigation } from 'react-native-navigation';
import { navComponents, bindPassProps } from '../../navigation';
import NotesList from './notesList';

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.byIndex);
  const count = useSelector((state) => state.notes.count);
  const limit = useSelector((state) => state.notes.pagination.limit);
  const loading = useSelector((state) => state.notes.loading);
  const page = useSelector((state) => state.notes.pagination.page);

  React.useEffect(() => {
    if (count === null) {
      dispatch(notesActions.loadNotes({ page }));
    }
  }, [count, dispatch, page]);

  const onNoteSelect = (noteItem) => {
    dispatch(notesActions.navigateToNote(noteItem));
  };

  const loadMore = () => {
    const nextPage = page + 1;
    const totalPage = Math.ceil(count / limit);

    if (!loading && nextPage <= totalPage) {
      dispatch(notesActions.loadNotes({ page: page + 1 }));
    }
  };

  return (
    <>
      {count === null ? (
        <FullscreenLoader />
      ) : (
        <>
          {count === 0 ? (
            <FullscreenEmptyList />
          ) : (
            <NotesList
              onNoteSelect={onNoteSelect}
              notes={notes}
              count={count}
              loading={loading}
              loadMore={loadMore}
            />
          )}
        </>
      )}
    </>
  );
};

Notes.options = {
  topBar: {
    rightButtons: [
      {
        id: 'profile',
        component: {
          name: 'topbar.menuIcon',
          aligment: 'center',
        },
      },
    ],
    title: {
      text: 'Notes',
    },
  },
};

export default Notes;
