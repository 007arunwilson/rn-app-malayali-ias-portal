/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../../config';
import InlineLoader from '../inlineLoader';

const ActionButton = ({ paynowActionHandler, paynowProgressing }) => {
  return (
    <>
      <View style={styles.card}>
        <View style={[styles.content, styles.actionContent]}>
          {paynowProgressing ? (
            <View style={styles.loadingQuestions}>
              <InlineLoader />
            </View>
          ) : (
            <TouchableOpacity activeOpacity={0.8} onPress={paynowActionHandler}>
              <View style={[styles.actionButton, styles.actionPaynowButton]}>
                <Text style={styles.actionButtonText}>Pay now</Text>
                <Icon
                  color={color.white}
                  size={16}
                  name={'arrow-right-circle-outline'}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 2,
    borderRadius: 4,
    marginHorizontal: 24,
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignSelf: 'stretch',
  },
  actionContent: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  actionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  actionButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionResultToggleButton: {
    backgroundColor: color.primary,
  },
  actionPaynowButton: {
    backgroundColor: color.primary,
  },
  actionButtonText: {
    color: color.white,
    marginRight: 6,
  },
});

export default ActionButton;
