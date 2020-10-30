/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { color } from '../../config';
import { navComponents } from '../../navigation';

const Signin = () => {
  const handler = () => {
    Navigation.push('onboarding', navComponents.signin);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.leftText}>{' Already have an account ?'}</Text>
      <Text onPress={handler} style={styles.rightText}>
        Sign in
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 4,
    marginLeft: 6,
    justifyContent: 'center',
  },
  leftText: {
    fontSize: 13,
    color: color.textLight,
    marginRight: 10,
  },
  rightText: {
    fontSize: 14,
    color: color.text,
    marginRight: 10,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default Signin;
