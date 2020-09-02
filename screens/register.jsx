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
import { Picker } from '@react-native-community/picker';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import * as helperValidation from '../helpers/validation';
import { color } from '../config';
import TextInputField from '../components/form/textInputField';
import { PrimaryButton } from '../components/form/primaryButton';
import {
  getValidClassStandardsFromMaster,
  processRegister,
  isEmailValidByApi,
  isPhoneValidByApi,
} from '../store/actions/register';

const Register = () => {
  const dispatch = useDispatch();
  const memorizedForm = useSelector((state) => state.register.memorizedForm);
  const viaSocialAuth = useSelector((state) => state.register.viaSocialAuth);
  const [name, setName] = React.useState(memorizedForm.name || null);
  const [email, setEmail] = React.useState(memorizedForm.email || null);
  const [phone, setPhone] = React.useState(memorizedForm.phone || null);
  const [password, setPassword] = React.useState(null);
  const [inProgress, setInProgress] = React.useState(false);

  React.useState(() => {
    // getValidClassStandardsFromMaster().then((result) => {
    //   setStandardSelectableItems(result);
    // });
  }, []);

  const handleFormSubmit = () => {
    if (!isFormValid) {
      ToastAndroid.show(
        'Please check the form before continue, Something seems wrong!',
        ToastAndroid.SHORT,
      );
    } else {
      setInProgress(true);
      Promise.all([
        new Promise((resolve) => {
          if (
            viaSocialAuth &&
            memorizedForm.email &&
            memorizedForm.email === email
          ) {
            resolve(true);
          } else {
            isEmailValidByApi(email).then(resolve);
          }
        }),
        new Promise((resolve) => {
          if (
            viaSocialAuth &&
            memorizedForm.phone &&
            memorizedForm.phone === phone
          ) {
            resolve(true);
          } else {
            isPhoneValidByApi(phone).then(resolve);
          }
        }),
      ]).then(([isEmailValid, isValidPhone]) => {
        let error = null;
        if (!isEmailValid && !isValidPhone) {
          error =
            'Sorry. It seems email and phone are duplication, please use a new one';
        } else if (!isEmailValid) {
          error = 'Sorry. It seems email is duplication, please use a new one';
        } else if (!isValidPhone) {
          error = 'Sorry. It seems phone is duplication, please use a new one';
        }
        if (error) {
          setInProgress(false);
          Alert.alert(
            'Error!',
            error,
            [
              {
                text: 'OK',
                onPress: () => {
                  if (!isEmailValid) {
                    setEmail(null);
                  }
                  if (!isValidPhone) {
                    setPhone(null);
                  }
                },
              },
            ],
            { cancelable: false },
          );
        } else {
          dispatch(
            processRegister({
              name,
              email,
              phone,
              password,
            }),
          );
        }
      });
    }
  };

  const isFormValid = React.useMemo(() => {
    return (
      name &&
      helperValidation.isValidEmail(email) &&
      helperValidation.isValidPhone(phone) &&
      helperValidation.isValidPassword(password)
    );
  }, [name, email, phone, password]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={'handled'}>
      <View pointerEvents={inProgress ? 'none' : 'auto'} style={styles.inner}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.form}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Name</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInputField value={name} onChange={setName} maxLength={32} />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Email </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInputField
              value={email}
              onChange={setEmail}
              maxLength={82}
              keyboardType={'email-address'}
            />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Phone </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInputField
              value={phone}
              onChange={setPhone}
              maxLength={10}
              keyboardType={'phone-pad'}
              placeholder={'10 digit phone number'}
            />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Password </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInputField
              value={password}
              onChange={setPassword}
              maxLength={32}
              secureTextEntry={true}
              placeholder={'must have atleast 6 characters'}
            />
          </View>
          <View
            onStartShouldSetResponder={!isFormValid && handleFormSubmit}
            style={styles.actionButtonContainer}>
            <PrimaryButton
              onPress={!inProgress && handleFormSubmit}
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
  form: { marginBottom: 10, flex: 1 },
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
    marginBottom: 18,
  },
  coursePicker: {
    width: '100%',
  },
  actionButtonContainer: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
});

// RNN options
Register.options = {
  topBar: {
    title: {
      text: 'Create your account',
    },
  },
};

export default Register;
