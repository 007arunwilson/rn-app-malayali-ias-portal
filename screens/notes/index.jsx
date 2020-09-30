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
const Notes = (props) => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.byIndex);
  const count = useSelector((state) => state.notes.count);
  const limit = useSelector((state) => state.notes.pagination.limit);
  const loading = useSelector((state) => state.notes.loading);
  const page = useSelector((state) => state.notes.pagination.page);
  const [categoryFilter] = React.useState(props.category.category_id);

  React.useEffect(() => {
    dispatch(notesActions.loadNotes({ page, categoryId: categoryFilter }));
    return () => dispatch(notesActions.reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNoteSelect = (noteItem) => {
    dispatch(
      notesActions.navigateToNote({ noteItem, navigation: { from: 'notes' } }),
    );
  };

  const loadMore = () => {
    const nextPage = page + 1;
    const totalPage = Math.ceil(count / limit);

    if (!loading && nextPage <= totalPage) {
      dispatch(
        notesActions.loadNotes({
          page: page + 1,
          categoryId: categoryFilter,
        }),
      );
    }
  };

  const onRefresh = () =>
    dispatch(
      notesActions.loadNotes({
        page: 1,
        category: categoryFilter,
        updateCount: true,
      }),
    );

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
              {/* <Filters
                filter={filter}
                onFilterChange={onFilterChange}
                setFilter={setFilter}
              /> */}
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
