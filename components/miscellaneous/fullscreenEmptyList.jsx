/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { color } from '../../config';

const FullscreenEmptyList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.emptyText}>- No items to show -</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: color.textLight,
  },
});

export default FullscreenEmptyList;
