/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { color } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import * as examsActions from '../../store/actions/exams';
import FullscreenLoader from '../../components/miscellaneous/fullscreenLoader';
import FullscreenEmptyList from '../../components/miscellaneous/fullscreenEmptyList';

import { Navigation } from 'react-native-navigation';
import { navComponents, bindPassProps } from '../../navigation';
import ExamsList from './examsList';

const Exams = () => {
  const dispatch = useDispatch();
  const exams = useSelector((state) => state.exams.byIndex);
  const count = useSelector((state) => state.exams.count);
  const limit = useSelector((state) => state.exams.pagination.limit);
  const loading = useSelector((state) => state.exams.loading);
  const page = useSelector((state) => state.exams.pagination.page);

  React.useEffect(() => {
    if (count === null) {
      dispatch(examsActions.loadExams({ page }));
    }
  }, [count, dispatch, page]);

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
      dispatch(examsActions.loadExams({ page: page + 1 }));
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
            <ExamsList
              onExamSelect={onExamSelect}
              exams={exams}
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
