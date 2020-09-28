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
  ScrollView,
} from 'react-native';
import React from 'react';

import config, { color } from '../../../config';
import { RNNDrawer } from 'react-native-navigation-drawer-extension';
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../../../store/actions/app';
import MenuItem from './menutItem';
import { Navigation } from 'react-native-navigation';
import { navComponents } from '../../../navigation';

const SidebarDefault = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const backAction = () => {
    RNNDrawer.dismissDrawer();
    return true;
  };

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  return user ? (
    <View style={styles.container}>
      <View style={styles.brandContainer}>
        <Image
          fadeDuration={0}
          style={styles.logo}
          source={require('../../../assets/logo.png')}
        />
        <View style={styles.logoTextWrapper}>
          <Text style={styles.instituteText}>{config.instituteName}</Text>
          {config.instituteBranch ? (
            <Text style={styles.branchText}>{config.instituteBranch}</Text>
          ) : null}
        </View>
      </View>
      <View style={styles.userContainer}>
        <Text style={styles.supText}>Logined as:</Text>
        <Text style={styles.userText}>{user.name}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.menuContainerStyle}
        style={styles.menu}>
        <MenuItem
          text={'Home'}
          icon={'home'}
          onClick={() => {
            Navigation.popTo('home').finally(() => {
              backAction();
            });
          }}
        />
        <MenuItem
          text={'Logout'}
          icon={'logout'}
          onClick={() => {
            dispatch(appActions.processLogout());
            backAction();
          }}
        />
      </ScrollView>
      {/* <View style={styles.versionContainer} >
      <Text></Text>
    </View> */}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundLight,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  brandContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  logoTextWrapper: {
    justifyContent: 'center',
  },
  topText: {
    fontSize: 16,
    color: color.secondary,
    marginBottom: -4,
    marginLeft: 2,
  },
  instituteText: {
    fontSize: 18,
    color: color.primary,
  },
  branchText: {
    fontSize: 12,
    color: color.textLight,
    marginLeft: 4,
    textAlign: 'right',
  },
  userContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'stretch',
    marginLeft: 20,
  },
  supText: {
    fontSize: 12,
    color: color.textLight,
  },
  userText: {
    fontSize: 16,
  },
  menu: {
    marginTop: 0,
    alignSelf: 'stretch',
  },
  menuContainerStyle: {},
  versionContainer: {
    alignSelf: 'stretch',
  },
});

export default SidebarDefault;
