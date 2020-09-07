/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../../config';

const BottomActions = () => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.exitContainer}>
          <TouchableWithoutFeedback onPress={() => true}>
            <View style={styles.exitButton}>
              <Text style={styles.exitButtonText}>Exit exam</Text>
              <Icon color={color.white} size={16} name="pause-circle-outline" />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.navigationContainer}>
          <TouchableWithoutFeedback disabled={false} onPress={() => true}>
            <View
              style={[
                styles.previousQuestionButtton,
                true ? { opacity: 0.2 } : null,
              ]}>
              <Icon
                color={color.text}
                size={16}
                name="chevron-left-circle-outline"
              />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback disabled={!1} onPress={() => true}>
            <View
              style={[styles.nextQuestionButton, !1 ? { opacity: 0.2 } : null]}>
              <Icon color={color.text} size={16} name="chevron-right" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.white,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    elevation: 2,
    borderRadius: 4,
    marginHorizontal: 24,
    marginTop: 12,
  },
  content: {
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  exitContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  pauseButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#EBEDEF',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseButtonText: {
    color: '#2C3E50',
    marginRight: 6,
  },
  exitButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#34495E',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButtonText: {
    color: '#EBEDEF',
    marginRight: 6,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 0.5,
  },
  previousQuestionButtton: {
    backgroundColor: '#EBEDEF',
    width: 32,
    height: 32,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextQuestionButton: {
    backgroundColor: '#EBEDEF',
    width: 32,
    height: 32,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomActions;
