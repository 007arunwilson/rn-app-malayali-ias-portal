/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import config, { color } from '../config';

const launch = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoTextWrapper}>
        <Text style={styles.topText}>E-Learning</Text>
        <Text style={styles.instituteText}>{config.instituteName}</Text>
        {config.instituteBranch ? (
          <Text style={styles.branchText}>{config.instituteBranch}</Text>
        ) : null}
      </View>
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
  logoTextWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  topText: {
    fontSize: 16,
    color: color.secondary,
    marginBottom: -4,
    marginLeft: 2,
  },
  instituteText: {
    fontSize: 30,
    color: color.primary,
  },
  branchText: {
    fontSize: 12,
    color: color.text,
    marginLeft: 4,
    textAlign: 'right',
  },
});

export default launch;
