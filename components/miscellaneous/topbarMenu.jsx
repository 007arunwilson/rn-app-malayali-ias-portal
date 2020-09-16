/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../config';
import { RNNDrawer } from 'react-native-navigation-drawer-extension';
/** At present this component only user for the right menu for options,
 * need to make this reusable
 */
const TopbarMenuIcon = (props) => {
  const actionHandler = () => {
    RNNDrawer.showDrawer({
      component: {
        name: 'sidebar.default',
        passProps: {
          animationOpenTime: 120,
          animationCloseTime: 20,
          direction: 'left',
          dismissWhenTouchOutside: true,
          fadeOpacity: 0.6,
          drawerScreenWidth: '75%' || 445,
          drawerScreenHeight: '100%' || 700,
          style: {
            backgroundColor: color.backgroundLight,
          },
          parentComponentId: props.componentId,
        },
      },
    });
  };

  return (
    <TouchableOpacity onPress={actionHandler} style={styles.container}>
      <Icon color={color.primaryText} size={26} name={'menu'} />
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

export default TopbarMenuIcon;
