/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../../config';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Card = ({ examItem, onExamSelect }) => {
  const { title } = examItem;

  let titleText = '';
  const titleSplitted = title.split(' ');
  if (titleSplitted.length > 6) {
    titleText = `${titleSplitted.slice(0, 4).join(' ')} ...`;
  } else {
    titleText = title;
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => onExamSelect(examItem)}
        activeOpacity={0.6}
        style={styles.card}>
        <View style={styles.lhs}>
          <View style={styles.iconContainer}>
            <Icon color={color.white} size={40} name="clipboard-text" />
          </View>
        </View>
        <View style={styles.rhs}>
          <Text style={styles.title}>{titleText}</Text>
        </View>
      </TouchableOpacity>
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
    flexDirection: 'row',
    width: wp(48),
  },
  lhs: {},
  iconContainer: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primary,
  },
  rhs: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    color: color.text,
    fontSize: 12,
  },
  description: {
    color: color.text,
    fontSize: 10,
  },
});

export default Card;
