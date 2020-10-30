/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { color } from '../../config';

const FullscreenMessage = (props) => {
  const { text, indicator } = props;

  let indicatorSize = props.indicatorSize || 18;

  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>{text}</Text>
      {indicator && (
        <ActivityIndicator
          style={styles.indicator}
          size={indicatorSize}
          color={color.secondary}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  messageText: {
    color: color.text,
  },
  indicator: {
    marginLeft: 8,
  },
});

export default FullscreenMessage;
