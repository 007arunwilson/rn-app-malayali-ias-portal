/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { color } from '../../config';

const Title = (props) => {
  return null;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.white,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    elevation: 2,
    borderRadius: 4,
    marginHorizontal: 24,
    marginTop: 12,
  },
  content: {
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default Title;
