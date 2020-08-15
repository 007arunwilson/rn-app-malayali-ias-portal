/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { color } from '../../config';

const Progress = () => {
  const inProgress = useSelector((state) => state.onboarding.inProgress);
  const activeStep = useSelector((state) => state.onboarding.activeStep);

  let statusText = 'Please wait ..';
  if (activeStep === 'CREATING_ACCOUNT') {
    statusText = 'Creating account ..';
  } else if (activeStep === 'CREATING_SESSION') {
    statusText = 'Creating session ..';
  }

  return (
    <View style={styles.actionBottom}>
      {inProgress ? (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{statusText}</Text>
          <ActivityIndicator size={18} color={color.text} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  actionBottom: {
    width: '100%',
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
    marginLeft: 6,
  },
  statusText: {
    fontSize: 12,
    color: color.textLight,
    marginRight: 10,
  },
});

export default Progress;
