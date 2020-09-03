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
const Videos = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.byIndex);
  const count = useSelector((state) => state.videos.count);
  const loading = useSelector((state) => state.videos.loading);
  const page = useSelector((state) => state.videos.pagination.page);

  console.log(loading);

  React.useEffect(() => {
    if (count === null) {
      dispatch(videosActions.loadVideos({ page }));
    }
  }, [count, dispatch, page, videos]);

  const onVideoPress = (videoItem) => {
    console.log('videoItem', videoItem);
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
    backgroundColor: color.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Videos.options = {
  topBar: {
    title: {
      text: 'Videos',
    },
  },
};

export default Videos;
