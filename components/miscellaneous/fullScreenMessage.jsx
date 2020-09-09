/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { color } from '../../config';

const FullscreenMessage = (props) => {
  const { text } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.emptyText}>{text}</Text>
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
  messageText: {
    color: color.text,
  },
});

export default FullscreenMessage;
