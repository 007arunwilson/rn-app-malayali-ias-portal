/**
 * @format
 * @flow strict-local
 */
import {
  StyleSheet,
  View,
  BackHandler,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { color } from '../../../config';

const MenuItem = (props) => {
  const { onClick, text, icon } = props;
  return (
    <TouchableOpacity style={styles.menutItem} onPress={onClick}>
      <Icon style={styles.icon} color={'#061343'} size={22} name={icon} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menutItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  text: {
    marginLeft: 10,
    color: '#061343',
  },
  icon: {
    marginRight: 12,
  },
});

export default MenuItem;
