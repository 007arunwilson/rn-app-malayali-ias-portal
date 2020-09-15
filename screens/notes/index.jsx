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
import NotesList from './notesList';
import Filters from './filters';
const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.byIndex);
  const count = useSelector((state) => state.notes.count);
  const limit = useSelector((state) => state.notes.pagination.limit);
  const loading = useSelector((state) => state.notes.loading);
  const page = useSelector((state) => state.notes.pagination.page);
  const [filter, setFilter] = React.useState({ subjectId: null, topicId: null });

  React.useEffect(() => {
    dispatch(notesActions.loadNotes({ page }));
    return () => dispatch(notesActions.reset());
  }, []);

  const onNoteSelect = (noteItem) => {
    dispatch(notesActions.navigateToNote({ noteItem, navigation: { from: 'notes' } }));
  };

  const loadMore = () => {
    const nextPage = page + 1;
    const totalPage = Math.ceil(count / limit);

    if (!loading && nextPage <= totalPage) {
      dispatch(notesActions.loadNotes({ page: page + 1, cstItemId: (filter.topicId || filter.subjectId) }));
    }
  };

  const onFilterChange = (cstItemId) =>
    dispatch(notesActions.loadNotes({ page: 1, cstItemId, updateCount: true }))

  const onRefresh = () =>
    dispatch(notesActions.loadNotes({ page: 1, cstItemId: (filter.topicId || filter.subjectId), updateCount: true }))


  return (
    <>
      {count === null ? (
        <FullscreenLoader />
      ) : (
          <>
            {count === 0 ? (
              <FullscreenEmptyList />
            ) : (
                <>
                  <Filters
                    filter={filter}
                    onFilterChange={onFilterChange}
                    setFilter={setFilter} />
                  <NotesList
                    onNoteSelect={onNoteSelect}
                    notes={notes}
                    count={count}
                    loading={loading}
                    loadMore={loadMore}
                    onRefresh={onRefresh}
                  />
                </>
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
