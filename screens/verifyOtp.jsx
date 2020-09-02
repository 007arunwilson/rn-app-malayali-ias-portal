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
import { useSelector, useDispatch } from 'react-redux';
import { color } from '../config';
import TextInputField from '../components/form/textInputField';
import { PrimaryButton } from '../components/form/primaryButton';
import * as helperValidation from '../helpers/validation';
import { verifyOtp, createAccount } from '../store/actions/register';

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const phone = useSelector((state) => state.register.memorizedForm.phone);
  const otpTimerIntervalRef = React.useRef(null);
  const [otp, setOtp] = React.useState(null);
  const [inProgress, setInProgress] = React.useState(false);
  const [otpTimer, setOtpTimer] = React.useState(30);

  const isFormValid = React.useMemo(() => {
    return helperValidation.isValidOTP(otp);
  }, [otp]);

  const handleFormSubmit = () => {
    setInProgress(true);
    verifyOtp({ phone, otp }).then(
      () => {
        dispatch(createAccount());
      },
      () => {
        Alert.alert(
          'Error!',
          'It seems a wrong OTP you entered, please try again.',
          [
            {
              text: 'OK',
              onPress: () => {
                setOtp(null);
              },
            },
          ],
          { cancelable: false },
        );
        setInProgress(false);
      },
    );
  };

  const resendHandler = () => {
    setOtpTimer(30);
    otpTimerIntervalHandler();
    ToastAndroid.show("You'll recieve a new OTP shortly", ToastAndroid.SHORT);
  };

  const otpTimerIntervalHandler = () => {
    otpTimerIntervalRef.current = setInterval(() => {
      setOtpTimer((otpTimerVal) => {
        if (otpTimerVal === 1) {
          clearTimeout(otpTimerIntervalRef.current);
        }
        return otpTimerVal - 1;
      });
    }, 1000);
  };

  React.useEffect(() => {
    otpTimerIntervalHandler();
    return () => {
      clearTimeout(otpTimerIntervalRef.current);
    };
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={'always'}>
      <View pointerEvents={inProgress ? 'none' : 'auto'} style={styles.inner}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.form}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Enter OTP</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInputField
              value={otp}
              placeholder={'Enter 5 digit OTP you recieved'}
              onChange={setOtp}
              maxLength={5}
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.resendOtpContainer}>
            {otpTimer !== 0 ? (
              <Text style={styles.resendWaitText}>
                Resend OTP in {otpTimer} seconds
              </Text>
            ) : null}
            {otpTimer === 0 ? (
              <Text onPress={resendHandler} style={styles.resendAction}>
                Resend OTP
              </Text>
            ) : null}
          </View>
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
        </KeyboardAvoidingView>
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
  form: { flex: 1 },
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
  resendOtpContainer: {
    marginBottom: 18,
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
VerifyOtp.options = {
  topBar: {
    title: {
      text: 'Verify OTP',
    },
  },
};

export default VerifyOtp;
