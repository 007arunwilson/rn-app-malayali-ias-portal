/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { color } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import * as videosActions from '../../store/actions/videos';
import FullscreenLoader from '../../components/miscellaneous/fullscreenLoader';
import FullscreenEmptyList from '../../components/miscellaneous/fullscreenEmptyList';
import VideosList from './videosList';
import { Navigation } from 'react-native-navigation';
import { navComponents, bindPassProps } from '../../navigation';
const Videos = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.byIndex);
  const count = useSelector((state) => state.videos.count);
  const loading = useSelector((state) => state.videos.loading);
  const limit = useSelector((state) => state.videos.pagination.limit);
  const page = useSelector((state) => state.videos.pagination.page);

  console.log(loading);

  React.useEffect(() => {
    if (count === null) {
      dispatch(videosActions.loadVideos({ page }));
    }
  }, [count, dispatch, page]);

  const onVideoPress = (videoItem) => {
    Navigation.push(
      'videos',
      bindPassProps({ videoItem }, navComponents.videoPlayer),
    );
  };

  const loadMore = () => {
    const nextPage = page + 1;
    const totalPage = Math.ceil(count / limit);

    if (!loading && nextPage <= totalPage) {
      dispatch(videosActions.loadVideos({ page: page + 1 }));
    }
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
            <VideosList
              onVideoPress={onVideoPress}
              videos={videos}
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

Videos.options = {
  topBar: {
    title: {
      text: 'Videos',
    },
  },
};

export default Videos;
