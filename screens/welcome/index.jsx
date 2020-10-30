/**
 * @format
 * @flow strict-local
 */
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../config';
import { navComponents } from '../../navigation';
import { Navigation } from 'react-native-navigation';

const Welcome = () => {
  const continueToSubscriptions = () => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [navComponents.subscribe],
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentTop}>
        <Image
          fadeDuration={0}
          style={styles.contentTopImage}
          source={require('../../assets/logo.png')}
        />
        <View>
          <Text style={styles.titleTextPart1}>Welcome to</Text>
          <Text style={styles.titleTextPart2}>Malayali IAS Portal</Text>
        </View>
        <View style={styles.contentMid}>
          <Text style={styles.contentMidTopText}>
            Congrats!, Your account has been successfully created ...
          </Text>
          <Text style={styles.contentMidBottomText}>
            Choose a subscription to continue. You can choose a paid ( which
            have access to our excessive content ) or free package ( which will
            have limited content access )
          </Text>
        </View>
      </View>
      <View style={styles.contentBottom}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.contentBottomAction}
          onPress={continueToSubscriptions}>
          <Text style={styles.contentBottomActionText}>
            Continue to subscriptions
          </Text>
          <Icon
            color={color.shadowWhite}
            size={22}
            name={'arrow-right-circle-outline'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentTop: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contentTopImage: {
    width: wp(40),
    height: wp(40),
    marginBottom: 40,
  },
  titleTextPart1: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: color.primary,
  },
  titleTextPart2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: color.primary,
  },
  contentMid: { marginTop: 40 },
  contentMidTopText: {
    marginBottom: 16,
    fontSize: 18,
    textAlign: 'center',
    color: '#45516C',
    fontWeight: 'bold',
  },
  contentMidBottomText: { color: '#566077', fontSize: 13, textAlign: 'center' },
  contentBottom: { alignItems: 'center' },
  contentBottomAction: {
    backgroundColor: color.primary,
    borderWidth: 1,
    borderColor: color.primaryLight,
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: 'row',
  },
  contentBottomActionText: {
    padding: 10,
    color: color.white,
    fontWeight: 'bold',
  },
});

// RNN options
Welcome.options = {
  topBar: {
    visible: false,
  },
};

export default Welcome;
