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

const ForgotPasswordStep2 = (props) => {
  const [inProgress, setInProgress] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const isFormValid = React.useMemo(() => {
    return (
      helperValidation.isValidOTP(token) &&
      helperValidation.isValidPassword(password)
    );
  }, [token, password]);

  const handleFormSubmit = () => {
    if (!isFormValid) {
      ToastAndroid.show(
        'Please check the form before continue, Something seems wrong!',
        ToastAndroid.SHORT,
      );
    } else {
      setInProgress(true);
      authActions
        .resetPasswordCreateNewPassword({ email: props.email, token, password })
        .then(
          () => {
            Alert.alert(
              'Success!',
              'Your account password is updated successfully, You can now login to your account with the new password',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    Navigation.popTo('signin');
                  },
                },
              ],
              { cancelable: false },
            );
          },
          (error) => {
            Alert.alert(
              'Error!',
              'Invalid token! Please try again',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    setToken(null);
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
            <Text style={styles.label}>Token</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInputField
              value={token}
              placeholder={'Enter received token'}
              onChange={setToken}
              maxLength={5}
            />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>New Password</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInputField
              value={password}
              placeholder={'Enter your new password'}
              onChange={setPassword}
              secureTextEntry={true}
              maxLength={32}
            />
          </View>
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
ForgotPasswordStep2.options = {
  topBar: {
    title: {
      text: 'Forgot password',
    },
    subtitle: {
      text: 'Step 2/2',
    },
  },
};

export default ForgotPasswordStep2;
