/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { color } from '../../config';

const Card = (props) => {
  const { text, onPress } = props;

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.6}
        style={styles.card}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 20,
    paddingHorizontal: 28,
    minHeight: 100,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    borderRadius: 4,
    marginBottom: 24,
  },
  text: {
    color: color.primaryText,
    fontSize: 18,
  },
});

export default Card;
