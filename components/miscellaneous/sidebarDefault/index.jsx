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
  TouchableOpacity,
  Linking,
  ToastAndroid,
  Alert,
} from 'react-native';
import React from 'react';

import config, { color } from '../../../config';
import { RNNDrawer } from 'react-native-navigation-drawer-extension';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.menuContainerStyle}
        style={styles.menu}>
        <TouchableOpacity
          style={styles.menutItem}
          onPress={() => {
            Navigation.popTo('home').finally(() => {
              backAction();
            });
          }}>
          <Icon style={styles.icon} color={'#061343'} size={22} name={'home'} />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menutItem}
          onPress={() => {
            Navigation.push('home', navComponents.packageSelection).finally(
              () => {
                backAction();
              },
            );
          }}>
          <Icon
            style={styles.icon}
            color={'#061343'}
            size={22}
            name={'package-variant'}
          />
          <Text style={styles.menuText}>Switch package</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menutItem}
          onPress={() => {
            Navigation.push('home', navComponents.subscribe).finally(() => {
              backAction();
            });
          }}>
          <Icon
            style={styles.icon}
            color={'#061343'}
            size={22}
            name={'record-circle'}
          />
          <Text style={styles.menuText}>Subscribe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menutItem}
          onPress={() => {
            Navigation.push('home', navComponents.activeSubscriptions).finally(
              () => {
                backAction();
              },
            );
          }}>
          <Icon
            style={styles.icon}
            color={'#061343'}
            size={22}
            name={'record-circle'}
          />
          <Text style={styles.menuText}>Active Subscriptions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menutItem}
          onPress={() => {
            dispatch(appActions.processLogout());
            backAction();
          }}>
          <Icon
            style={styles.icon}
            color={'#061343'}
            size={22}
            name={'logout-variant'}
          />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.menuSeperator} />
        <TouchableOpacity
          style={styles.menutItem}
          onPress={() => {
            Linking.canOpenURL('https://malayaliias.blogspot.com/').then(
              (supported) => {
                if (supported) {
                  Linking.openURL('https://malayaliias.blogspot.com/');
                } else {
                  ToastAndroid.show(
                    'Unable to open website url, please go directly to https://malayaliias.blogspot.com/',
                    ToastAndroid.LONG,
                  );
                }
              },
            );
          }}>
          <Icon style={styles.icon} color={'#061343'} size={20} name={'web'} />
          <Text style={[styles.menuText, styles.menuTextSmall]}>
            Website / blog
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menutItem}
          onPress={() => {
            Linking.canOpenURL(
              'https://www.instagram.com/malayali_ias_portal/',
            ).then((supported) => {
              if (supported) {
                Linking.openURL(
                  'https://www.instagram.com/malayali_ias_portal/',
                );
              } else {
                ToastAndroid.show(
                  'Unable to open website url, please go directly to https://www.instagram.com/malayali_ias_portal/',
                  ToastAndroid.LONG,
                );
              }
            });
          }}>
          <Icon
            style={styles.icon}
            color={'#061343'}
            size={20}
            name={'instagram'}
          />
          <Text style={[styles.menuText, styles.menuTextSmall]}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menutItem}
          onPress={() => {
            Linking.canOpenURL(
              'https://www.youtube.com/c/MalayaliIASPortal',
            ).then((supported) => {
              if (supported) {
                Linking.openURL('https://www.youtube.com/c/MalayaliIASPortal');
              } else {
                ToastAndroid.show(
                  'Unable to open youtube url, please go directly to https://www.youtube.com/c/MalayaliIASPortal',
                  ToastAndroid.LONG,
                );
              }
            });
          }}>
          <Icon
            style={styles.icon}
            color={'#061343'}
            size={20}
            name={'youtube'}
          />
          <Text style={[styles.menuText, styles.menuTextSmall]}>
            Youtube channel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menutItem}
          onPress={() => {
            Linking.canOpenURL('whatsapp://send?phone=+917907207428').then(
              (supported) => {
                if (supported) {
                  Linking.openURL('whatsapp://send?phone=+917907207428');
                } else {
                  ToastAndroid.show(
                    'Unable to open whatspp, please do a direct message to +917907207428 via your whatsapp',
                    ToastAndroid.LONG,
                  );
                }
              },
            );
          }}>
          <Icon
            style={styles.icon}
            color={'#061343'}
            size={20}
            name={'whatsapp'}
          />
          <Text style={[styles.menuText, styles.menuTextSmall]}>Whatsapp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menutItem}
          onPress={() => {
            Alert.alert(
              'Confirm',
              'Are you sure?  \nA call will initiate from your number to +917907207428',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Proceed',
                  onPress: () => Linking.openURL('tel:+917907207428'),
                },
              ],
              { cancelable: true },
            );
          }}>
          <Icon
            style={styles.icon}
            color={'#061343'}
            size={20}
            name={'phone'}
          />
          <Text style={[styles.menuText, styles.menuTextSmall]}>Contact</Text>
        </TouchableOpacity>
      </ScrollView>
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
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 40,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  logoTextWrapper: {
    justifyContent: 'center',
  },
  instituteText: {
    fontSize: 16,
    color: '#0A1E42',
    fontWeight: 'bold',
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
    width: '100%',
    paddingHorizontal: 20,
  },
  menuContainerStyle: {},
  menutItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  menuSeperator: {
    marginVertical: 12,
  },
  menuText: {
    marginLeft: 10,
    color: '#061343',
  },
  menuTextSmall: {
    fontSize: 12,
  },
  icon: {
    marginRight: 12,
  },
  versionContainer: {
    alignSelf: 'stretch',
  },
});

export default SidebarDefault;
