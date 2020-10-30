/**
 * @format
 * @flow strict-local
 */
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { navComponents } from '../../navigation';

const NotSubscribedAlert = () => {
  const actionHandler = () => {
    Navigation.push('home', navComponents.subscribe);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        You've only limited content access, Subscribe now get full access to our
        excessive contents
      </Text>
      <Text onPress={actionHandler} style={styles.actionText}>
        Subscribe now
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#FAEACA',
    borderRadius: 6,
  },
  message: {
    fontSize: 11,
    color: '#493003',
  },
  actionText: {
    color: '#372400',
    marginTop: 6,
    textDecorationLine: 'underline',
    padding: 4,
  },
});

export default NotSubscribedAlert;
