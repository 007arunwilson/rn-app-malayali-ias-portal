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
      <Icon color={color.primaryDark} size={26} name={icon} />
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
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: color.backgroundDark,
  },
  text: {
    marginLeft: 10,
    color: color.primaryDark,
  },
});

export default MenuItem;
