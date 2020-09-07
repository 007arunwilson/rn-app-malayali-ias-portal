/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, SafeAreaView } from 'react-native';
import React from 'react';
import { color } from '../../../config';
import Duration from './duration';
import Bullets from './bullets';
import BottomActions from '../bottomActions';

const DurationNBullets = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.content} >
        <Duration />
        <Bullets />
      </View>
    </View>
  );
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
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default DurationNBullets;
