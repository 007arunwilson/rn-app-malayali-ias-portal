/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { color } from '../../config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

// importing actions
import { updateInprogress, authFacebook } from '../../store/actions/onboarding';

const FacebookAuth = () => {
  const dispatch = useDispatch();

  const authHandler = () => {
    dispatch(updateInprogress(true));

    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (!result.isCancelled) {
          AccessToken.getCurrentAccessToken()
            .then((accessTokenResult) => {
              const { accessToken, userID } = accessTokenResult;
              const payload = { token: accessToken, facebookUserId: userID };
              dispatch(authFacebook(payload));
            })
            .catch((_error) => {
              dispatch(updateInprogress(true));
            });
        } else {
          dispatch(updateInprogress(true));
        }
      },
      function (_error) {
        dispatch(updateInprogress(true));
      },
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={authHandler}
      style={styles.fbButton}
      disabled={false}>
      <View style={styles.fbButtonIconContainer}>
        <Icon color={color.white} size={20} name="facebook" />
      </View>
      <View style={styles.fbButtonTextContainer}>
        <Text style={styles.fbButtonText}>Sign in with Facebook</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default FacebookAuth;
