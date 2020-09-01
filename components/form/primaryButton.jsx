import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import { color } from '../../config';

export const PrimaryButton = ({ onPress, children, status }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={
        status === 'enabled'
          ? styles.buttonStyleEnabled
          : styles.buttonStyleDisabled
      }
      disabled={status !== 'enabled'}
      onPress={onPress}>
      {status === 'loading' ? (
        <ActivityIndicator
          style={styles.spinnerStyle}
          size={'small'}
          color={color.secondary}
        />
      ) : (
        <Text
          style={
            status === 'enabled'
              ? styles.textStyleEnabled
              : styles.textStyleDisabled
          }>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyleEnabled: {
    backgroundColor: color.primary,
    borderWidth: 1,
    borderColor: color.primaryLight,
    borderRadius: 2,
    alignItems: 'center',
  },
  buttonStyleDisabled: {
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 2,
    alignItems: 'center',
  },
  textStyleEnabled: {
    padding: 10,
    color: color.white,
  },
  textStyleDisabled: {
    padding: 10,
    color: color.primary,
  },
  spinnerStyle: {
    padding: 8,
  },
});
