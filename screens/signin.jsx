/**
 * @format
 * @flow strict-local
 */
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ToastAndroid,
  Alert,
  TouchableOpacity,
  // ToastAndroid,
  // Alert,
} from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { color } from '../config';
import { useDispatch } from 'react-redux';
import * as helperValidation from '../helpers/validation';
import * as authActions from '../store/actions/auth';
import * as onboardingActions from '../store/actions/onboarding';
import TextInputField from '../components/form/textInputField';
import { PrimaryButton } from '../components/form/primaryButton';
import { Navigation } from 'react-native-navigation';
import { navComponents } from '../navigation';

const Signin = () => {
  const dispatch = useDispatch();
  const [inProgress, setInProgress] = React.useState(false);
  const [emailOrPhone, setEmailOrPhone] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const isFormValid = React.useMemo(() => {
    return (
      (helperValidation.isValidEmail(emailOrPhone) ||
        helperValidation.isValidPhone(emailOrPhone)) &&
      helperValidation.isValidPassword(password)
    );
  }, [emailOrPhone, password]);

  const handleForgotPassword = () => {
    Navigation.push('signin', navComponents.forgotPasswordStep1);
  };

  const handleFormSubmit = () => {
    if (!isFormValid) {
      ToastAndroid.show(
        'Please check the form before continue, Something seems wrong!',
        ToastAndroid.SHORT,
      );
    } else {
      setInProgress(true);
      authActions
        .login({ email_or_phone_or_username: emailOrPhone, password })
        .then(
          (result) => {
            const {
              access_token: accessToken,
              refresh_token: refreshToken,
            } = result.data;
            dispatch(
              onboardingActions.continueWithTokens({
                accessToken,
                refreshToken,
              }),
            );
          },
          (error) => {
            Alert.alert(
              'Error!',
              'Wrong credentials! Please try again',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    setEmailOrPhone(null);
                    setPassword(null);
                  },
                },
              ],
              { cancelable: false },
            );
          },
        )
        .finally(() => setInProgress(false));
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={'always'}>
      <View pointerEvents={inProgress ? 'none' : 'auto'} style={styles.inner}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.form}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Email / Phone</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInputField
              value={emailOrPhone}
              placeholder={'Enter your mail or phone'}
              onChange={setEmailOrPhone}
              maxLength={64}
            />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Password</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInputField
              value={password}
              placeholder={'Enter your account password'}
              onChange={setPassword}
              secureTextEntry={true}
              maxLength={32}
            />
          </View>
          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgetPasswordContainer}>
            <Text style={styles.resendAction}>Forgot password ?</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View
          onStartShouldSetResponder={!isFormValid && handleFormSubmit}
          style={styles.actionButtonContainer}>
          <PrimaryButton
            onPress={handleFormSubmit}
            status={`${!inProgress && isFormValid ? 'enabled' : ''}${
              !inProgress && !isFormValid ? 'disabled' : ''
            }${inProgress ? 'loading' : ''}`}>
            Continue
          </PrimaryButton>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    alignItems: 'center',
    flexGrow: 1,
  },
  inner: {
    width: wp(80),
    marginTop: 40,
    flex: 1,
  },
  label: {
    color: color.textLight,
    fontSize: 12,
  },
  labelContainer: {},
  inputContainer: {
    marginBottom: 4,
  },
  forgetPasswordContainer: {
    padding: 4,
  },
  resendWaitText: {
    fontSize: 12,
    color: color.textLight,
  },
  resendAction: {
    fontSize: 12,
    color: color.text,
    textDecorationLine: 'underline',
  },
  coursePicker: {
    width: '100%',
  },
  actionButtonContainer: {
    marginTop: 30,
  },
});

// RNN options
Signin.options = {
  topBar: {
    title: {
      text: 'Signin to account',
    },
  },
};

export default Signin;
