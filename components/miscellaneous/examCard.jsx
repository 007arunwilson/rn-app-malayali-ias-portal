/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../config';

const ExamCard = ({ examItem, onExamSelect }) => {
  let {
    title,
    description,
    learning_material_test_user_attempt_started_on,
    learning_material_test_user_attempt_submitted_on,
  } = examItem;

  let titleText = '';
  const titleSplitted = title.split(' ');
  if (titleSplitted.length > 6) {
    titleText = `${titleSplitted.slice(0, 4).join(' ')} ...`;
  } else {
    titleText = title;
  }

  let descriptionText = '';
  const descriptionSplitted = description.split(' ');
  if (descriptionSplitted.length > 10) {
    descriptionText = `${descriptionSplitted.slice(0, 14).join(' ')} ...`;
  } else {
    descriptionText = description;
  }

  const durationInMins = Math.ceil(examItem.duration / 60);

  return (
    <>
      <TouchableOpacity
        onPress={() => onExamSelect(examItem)}
        style={styles.card}>
        <View style={styles.top}>
          <Text style={styles.title}>{titleText}</Text>
          <Text style={styles.description}>{descriptionText}</Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.bottomLhs}>
            <View style={styles.bottomLhsRow}>
              <Icon color={color.textLight} size={14} name="clock-outline" />
              <Text style={styles.durationText}>
                Duration: {durationInMins} mins
              </Text>
            </View>

            {learning_material_test_user_attempt_started_on &&
            !learning_material_test_user_attempt_submitted_on ? (
              <View style={styles.bottomLhsRow}>
                <Icon
                  color={color.textLight}
                  size={14}
                  name="clipboard-list-outline"
                />
                <Text style={styles.durationText}>
                  Resume :
                  {new Date(
                    learning_material_test_user_attempt_started_on,
                  ).toDateString()}{' '}
                </Text>
              </View>
            ) : null}
            {learning_material_test_user_attempt_started_on &&
            learning_material_test_user_attempt_submitted_on ? (
              <View style={styles.bottomLhsRow}>
                <Icon
                  color={color.textLight}
                  size={14}
                  name="clipboard-list-outline"
                />
                <Text style={styles.durationText}>
                  Submitted :
                  {new Date(
                    learning_material_test_user_attempt_started_on,
                  ).toDateString()}{' '}
                </Text>
              </View>
            ) : null}
            <View style={[styles.bottomLhsRow, styles.bottomLastRow]}>
              {learning_material_test_user_attempt_started_on &&
              learning_material_test_user_attempt_submitted_on ? (
                <>
                  <Text
                    style={[
                      styles.examActionText,
                      styles.examActionTextResult,
                    ]}>
                    View Result
                  </Text>
                  <Icon color={color.primary} size={14} name="chevron-right" />
                </>
              ) : null}
              {learning_material_test_user_attempt_started_on &&
              !learning_material_test_user_attempt_submitted_on ? (
                <>
                  <Text
                    style={[
                      styles.examActionText,
                      styles.examActionTextResume,
                    ]}>
                    Resume Exam
                  </Text>
                  <Icon
                    color={color.orangeDark}
                    size={14}
                    name="chevron-right"
                  />
                </>
              ) : null}
              {!learning_material_test_user_attempt_started_on &&
              !learning_material_test_user_attempt_submitted_on ? (
                <>
                  <Text
                    style={[styles.examActionText, styles.examActionTextStart]}>
                    Start Exam
                  </Text>
                  <Icon
                    color={color.greenDark}
                    size={14}
                    name="chevron-right"
                  />
                </>
              ) : null}
            </View>
          </View>
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
    marginHorizontal: 24,
    marginTop: 12,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  top: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    color: color.text,
    fontSize: 18,
  },
  description: {
    color: color.text,
    fontSize: 12,
  },
  bottom: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginTop: 10,
  },
  bottomLhs: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  bottomLhsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    marginLeft: 2,
    color: color.textLight,
  },
  bottomRhs: {},
  examActionText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  examActionTextStart: {
    color: color.greenDark,
  },
  examActionTextResult: {
    color: color.primary,
  },
  examActionTextResume: {
    color: color.orangeDark,
  },
  bottomLastRow: {
    marginTop: 10,
  },
});

export default ExamCard;
