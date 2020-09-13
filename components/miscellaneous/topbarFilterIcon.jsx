/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../config';

const TopbarIcon = () => {
  return (
    <TouchableOpacity onPress={()=>true} style={styles.container}>
      <Icon color={color.primaryText} size={26} name={'filter-menu-outline'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'transparent', // To avoid not taking padding glitch
  },
});

export default TopbarIcon;
