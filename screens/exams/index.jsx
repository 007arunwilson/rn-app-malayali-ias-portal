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
  const loading = useSelector((state) => state.exams.loading);
  const page = useSelector((state) => state.exams.pagination.page);

  React.useEffect(() => {
    if (count === null) {
      dispatch(examsActions.loadExams({ page }));
    }
  }, [count, dispatch, page]);

  const onExamSelect = (examItem) => {
    console.log('examItem', examItem);
    // Navigation.push(
    //   'videos',
    //   bindPassProps({ videoItem }, navComponents.videoPlayer),
    // );
  };

  return (
    <>
      {loading || count === null ? (
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
            />
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Exams.options = {
  topBar: {
    title: {
      text: 'Exams',
    },
  },
};

export default Exams;
