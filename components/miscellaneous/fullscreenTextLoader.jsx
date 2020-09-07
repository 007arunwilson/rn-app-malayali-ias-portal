/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import React from 'react';
import { color } from '../../config';

const FullscreenTextLoader = (props) => {
  const text = props.text || 'Please wait ...';
  let textSize = props.textSize || 14;
  let indicatorSize = props.indicatorSize || 18;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: textSize }]}>{text}</Text>
      <ActivityIndicator size={indicatorSize} color={color.secondary} />
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
  text: {
    color: color.text,
    marginRight: 10,
  },
});

export default FullscreenTextLoader;
