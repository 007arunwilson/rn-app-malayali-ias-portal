/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { color } from '../../config';

const FullscreenLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={34} color={color.secondary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default FullscreenLoader;
