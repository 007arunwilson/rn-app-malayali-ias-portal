/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as examsActions from '../../store/actions/exams';
import FullscreenLoader from '../../components/miscellaneous/fullscreenLoader';
import FullscreenEmptyList from '../../components/miscellaneous/fullscreenEmptyList';

import ExamsList from './examsList';
import Filters from './filters';

const Exams = () => {
  const dispatch = useDispatch();
  const exams = useSelector((state) => state.exams.byIndex);
  const count = useSelector((state) => state.exams.count);
  const limit = useSelector((state) => state.exams.pagination.limit);
  const loading = useSelector((state) => state.exams.loading);
  const page = useSelector((state) => state.exams.pagination.page);
  const [filter, setFilter] = React.useState({
    subjectId: null,
    topicId: null,
  });

  React.useEffect(() => {
    dispatch(examsActions.loadExams({ page }));
    return () => dispatch(examsActions.reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onExamSelect = (examItem) => {
    dispatch(
      examsActions.navigateToExam({
        examItem,
        navigation: {
          type: 'push',
          from: 'exams',
        },
      }),
    );
  };

  const loadMore = () => {
    const nextPage = page + 1;
    const totalPage = Math.ceil(count / limit);

    if (!loading && nextPage <= totalPage) {
      dispatch(
        examsActions.loadExams({
          page: page + 1,
          cstItemId: filter.topicId || filter.subjectId,
        }),
      );
    }
  };

  const onFilterChange = (cstItemId) =>
    dispatch(examsActions.loadExams({ page: 1, cstItemId, updateCount: true }));

  const onRefresh = () =>
    dispatch(
      examsActions.loadExams({
        page: 1,
        cstItemId: filter.topicId || filter.subjectId,
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
              <Filters
                filter={filter}
                onFilterChange={onFilterChange}
                setFilter={setFilter}
              />
              <ExamsList
                onExamSelect={onExamSelect}
                exams={exams}
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

Exams.options = {
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
      text: 'Exams',
    },
  },
};

export default Exams;
