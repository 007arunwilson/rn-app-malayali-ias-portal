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
} from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { color } from '../config';
import * as helperValidation from '../helpers/validation';
import * as authActions from '../store/actions/auth';
import TextInputField from '../components/form/textInputField';
import { PrimaryButton } from '../components/form/primaryButton';
import { Navigation } from 'react-native-navigation';
import { navComponents, bindPassProps } from '../navigation';

const ForgotPasswordStep1 = () => {
  const [inProgress, setInProgress] = React.useState(false);
  const [email, setEmail] = React.useState(null);

  const isFormValid = React.useMemo(
    () => helperValidation.isValidEmail(email),
    [email],
  );

  const handleFormSubmit = () => {
    if (!isFormValid) {
      ToastAndroid.show(
        'Please check the form before continue, Something seems wrong!',
        ToastAndroid.SHORT,
      );
    } else {
      setInProgress(true);
      authActions
        .sendResetPasswordTokenEmail({ email })
        .then(
          () => {
            Navigation.push(
              'forgotPasswordStep1',
              bindPassProps({ email }, navComponents.forgotPasswordStep2),
            );
          },
          () => {
            Alert.alert(
              'Error!',
              'Wrong email! Please try again',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    setEmail(null);
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
            <Text style={styles.label}>Email</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInputField
              value={email}
              placeholder={'Enter your email'}
              onChange={setEmail}
              maxLength={64}
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
ForgotPasswordStep1.options = {
  topBar: {
    title: {
      text: 'Forgot password',
    },
    subtitle: {
      text: 'Step 1/2',
    },
  },
};

export default ForgotPasswordStep1;
