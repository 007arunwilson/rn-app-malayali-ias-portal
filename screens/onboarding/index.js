/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import config, { color } from '../../config';
import { useSelector } from 'react-redux';

// Importing Sub components
import FacebookAuth from './facebookAuth';
import GoogleAuth from './googleAuth';
import Progress from './progress';

const Onboarding = () => {
  const inProgress = useSelector((state) => state.onboarding.inProgress);

  return (
    <View style={styles.container} pointerEvents={inProgress ? 'none' : 'auto'}>
      <View style={styles.content}>
        <View style={styles.top}>
          <View style={styles.brandContainer}>
            <View style={styles.logoTextWrapper}>
              <Text style={styles.topText}>E-Learning</Text>
              <Text style={styles.instituteText}>{config.instituteName}</Text>
              {config.instituteBranch ? (
                <Text style={styles.branchText}>{config.instituteBranch}</Text>
              ) : null}
            </View>
          </View>
          <View style={styles.onboardingActionContainer}>
            <View style={styles.actionTop}>
              <GoogleAuth />
              <FacebookAuth />
            </View>
            <Progress />
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By proceeding, you agree to our Terms of use and confirm you have
            read our privacy policy
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundLight,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: wp(76),
  },
  top: {
    flex: 1,
  },
  brandContainer: {
    flex: 2,
  },
  logoTextWrapper: {
    flex: 1,
    justifyContent: 'center',
    width: wp(60),
  },
  topText: {
    fontSize: 14,
    color: color.secondary,
    marginBottom: -4,
    marginLeft: 2,
  },
  instituteText: {
    fontSize: 24,
    color: color.primary,
  },
  branchText: {
    fontSize: 11,
    color: color.text,
    marginLeft: 4,
    textAlign: 'right',
  },
  onboardingActionContainer: {
    flex: 3,
    alignItems: 'center',
    width: '100%',
  },
  actionTop: {
    flex: 4,
    justifyContent: 'flex-end',
    width: '100%',
  },
  googleButton: {},
  fbButton: {
    width: 'auto',
    height: 40,
    alignItems: 'center',
    borderRadius: 2,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingLeft: 1,
    marginHorizontal: 4,
    elevation: 4,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: color.black,
    shadowOffset: { height: 5, width: 5 },
    backgroundColor: color.fb,
    marginTop: 6,
  },
  fbButtonIconContainer: {
    height: 38,
    width: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fbButtonTextContainer: {
    alignItems: 'center',
    flex: 9,
  },
  fbButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: color.text,
    fontSize: 8,
    textAlign: 'center',
    marginBottom: 2,
  },
});

export default Onboarding;
