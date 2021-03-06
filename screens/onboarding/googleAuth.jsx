/**
 * @format
 * @flow strict-local
 */
import { StyleSheet } from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { useDispatch } from 'react-redux';

import config from '../../config';

// importing actions
import {
  updateInprogress,
  proceedWithGoogle,
} from '../../store/actions/onboarding';

const GoogleAuth = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
      webClientId: config.googleWebClientId,
      offlineAccess: true,
    });
  }, []);

  const authHandler = () => {
    dispatch(updateInprogress(true));
    try {
      GoogleSignin.hasPlayServices()
        .then(GoogleSignin.signIn, () => {
          dispatch(updateInprogress(false));
        })
        .then(
          (signInResult) => {
            const { idToken } = signInResult;
            const payload = { token: idToken };
            dispatch(proceedWithGoogle(payload));
          },
          (error) => {
            console.log('error', error);
            dispatch(updateInprogress(false));
          },
        );
    } catch (error) {
      dispatch(updateInprogress(false));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };

  return (
    <GoogleSigninButton
      style={styles.googleButton}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={authHandler}
    />
  );
};

const styles = StyleSheet.create({
  googleButton: { width: '100%' },
});

export default GoogleAuth;
