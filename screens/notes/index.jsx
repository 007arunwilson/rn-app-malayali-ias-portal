/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
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
  const { byIndex: allCategories } = useSelector(
    (state) => state.app.activePackage.categoriesByLearningMaterial.notes,
  );
  const [parentCategory] = React.useState(props.category.category_id);

  const filterCategories = useMemo(
    () => allCategories && allCategories.filter((item) => item.parent_id),
    [allCategories],
  );

  React.useEffect(() => {
    dispatch(notesActions.loadNotes({ page, categoryId: parentCategory }));
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
          categoryId: parentCategory,
        }),
      );
    }
  };

  const onRefresh = () =>
    dispatch(
      notesActions.loadNotes({
        page: 1,
        category: parentCategory,
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
              {parentCategory && filterCategories.length ? (
                <Filters
                  filterCategories={filterCategories}
                  parentCategory={parentCategory}
                />
              ) : null}

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
