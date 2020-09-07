/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../../config';

const Duration = (props) => {
  return (
    <View style={styles.container}>
      <Icon color={color.text} size={14} name="clock-outline" />
      <Text style={styles.text}>{`${'--'}:${'--'}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: color.text,
    marginLeft: 10,
  },
});

export default Duration;
