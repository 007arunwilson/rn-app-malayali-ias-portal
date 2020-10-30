/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../config';
const BasicMeta = (props) => {
  const { duration: duration_, questionsCount, totalScore } = props;
  const duration = Math.ceil(duration_ / 60);

  return (
    <>
      <View style={styles.bottomLhsRow}>
        <Icon color={color.textLight} size={14} name="clock-outline" />
        <Text style={styles.rowText}>Duration: {duration} mins</Text>
      </View>
      <View style={styles.bottomLhsRow}>
        <Icon color={color.textLight} size={14} name="crosshairs-question" />
        <Text style={styles.rowText}>Questions: {questionsCount} nos</Text>
      </View>
      <View style={styles.bottomLhsRow}>
        <Icon
          color={color.textLight}
          size={14}
          name="star-four-points-outline"
        />
        <Text style={styles.rowText}>Score: {totalScore} pts</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bottomLhsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    fontSize: 12,
    marginLeft: 2,
    color: color.textLight,
  },
});

export default BasicMeta;
