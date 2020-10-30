/**
 * @format
 * @flow strict-local
 */
import { TextInput, View, StyleSheet } from 'react-native';
import React from 'react';
import { color } from '../../config';

const TextInputField = (props) => {
  const {
    editable,
    value,
    placeholder,
    maxLength,
    multiline,
    underlineColorAndroid,
    secureTextEntry,
    onChange,
    autoCompleteType,
    keyboardType,
    ref,
  } = props;
  return (
    <View style={styles.container}>
      <TextInput
        maxLength={maxLength}
        value={value}
        multiline={typeof multiline !== 'undefined' ? multiline : false}
        placeholder={placeholder}
        editable={typeof editable !== 'undefined' ? editable : true}
        underlineColorAndroid={underlineColorAndroid || color.secondary}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        autoCompleteType={autoCompleteType}
        keyboardType={keyboardType}
        ref={ref}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default TextInputField;
