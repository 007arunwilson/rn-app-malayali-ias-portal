/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, FlatList, Text } from 'react-native';
import React from 'react';
import { color } from '../../config';
import VideoCard from '../../components/miscellaneous/videoCard';

const VideosList = (props) => {
  const { videos, onVideoPress, loading, loadMore, onRefresh } = props;

  const renderItem = ({ item }) => (
    <VideoCard onVideoPress={onVideoPress} videoItem={item} />
  );

  const keyExtractor = (item) => `_${item.learning_material_id}`;

  return (
    <FlatList
      data={videos}
      renderItem={renderItem}
      onRefresh={onRefresh}
      refreshing={loading}
      keyExtractor={keyExtractor}
      style={styles.list}
      contentContainerStyle={styles.listContainer}
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: color.backgroundLight,
  },
  listContainer: {
    paddingBottom: 10,
  },
});

export default VideosList;
