/**
 * @format
 * @flow strict-local
 */
import { View, Text, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { color } from '../../config';

const NotSubscribedAlert = () => {
  return (
    <View style={styles.container}>
      <View style={styles.lhs}>
        <Icon
          style={styles.icon}
          color={color.text}
          size={20}
          name="alert-outline"
        />
      </View>
      <View style={styles.rhs}>
        <Text style={styles.headText}>Not Subscribed !</Text>
        <Text style={styles.detailText}>
          You're not subscibed to any paid packages, so you've only access to
          limited contents. Contact support team for get a subscription.
        </Text>
        <Text style={styles.detailText}>
          Please contact
          <Text
            onPress={() => Linking.openURL('tel:0491-2548373')}
            style={styles.dialText}>
            {' 0491-2548373'}
          </Text>
          /
          <Text
            onPress={() => Linking.openURL('tel:+91-9447336138')}
            style={styles.dialText}>
            {' +91-9447336138'}
          </Text>{' '}
          /
          <Text
            onPress={() => Linking.openURL('tel:+91-9446101929')}
            style={styles.dialText}>
            {' +91-9446101929'}
          </Text>{' '}
          to upgrade.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flexDirection: 'row',
  },
  icon: {
    marginTop: 4,
  },
  lhs: {
    marginRight: 8,
  },
  rhs: {
    flex: 1,
  },
  headText: {
    fontSize: 18,
  },
  detailText: {
    fontSize: 12,
  },
  dialText: {
    textDecorationLine: 'underline',
  },
});

export default NotSubscribedAlert;
