/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { color } from '../../config';
const Title = (props) => {
  const { title, description } = props;

  return (
    <View style={styles.top}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    color: color.text,
    fontSize: 18,
  },
  description: {
    color: color.text,
    fontSize: 12,
  },
});

export default Title;
