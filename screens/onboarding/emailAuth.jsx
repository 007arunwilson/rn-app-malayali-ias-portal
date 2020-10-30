/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Navigation } from 'react-native-navigation';
import { color } from '../../config';
import { navComponents } from '../../navigation';

const EmailAuth = () => {
  const handler = () => {
    Navigation.push('onboarding', navComponents.register);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handler}
      style={styles.emailAuthButton}
      disabled={false}>
      <View style={styles.emailAuthButtonIconContainer}>
        <Icon color={color.textLight} size={20} name="at" />
      </View>
      <View style={styles.emailAuthButtonTextContainer}>
        <Text style={styles.emailAuthButtonText}>Continue with email</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emailAuthButton: {
    width: 'auto',
    height: 40,
    alignItems: 'center',
    borderRadius: 2,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingLeft: 1,
    marginHorizontal: 4,
    elevation: 4,
    shadowOpacity: 0.75,
    shadowRadius: 4,
    shadowColor: color.black,
    shadowOffset: { height: 5, width: 5 },
    backgroundColor: color.white,
    marginTop: 6,
  },
  emailAuthButtonIconContainer: {
    height: 38,
    width: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailAuthButtonTextContainer: {
    alignItems: 'center',
    flex: 9,
  },
  emailAuthButtonText: {
    fontWeight: 'bold',
    color: color.textLight,
  },
});

export default EmailAuth;
