/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../config';
const ResumeExam = () => {
  return (
    <>
      <View style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.instructionsHead}>Instructions:</Text>
          <View style={styles.instructionItem}>
            <Icon color={color.textLight} size={16} name="circle-outline" />
            <Text style={styles.instructionItemText}>
              You can resume the exam from previous stop point
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <Icon color={color.textLight} size={16} name="circle-outline" />
            <Text style={styles.instructionItemText}>
              You can stop and resume from the point you stopped by the back
              button press
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <Icon color={color.textLight} size={16} name="circle-outline" />
            <Text style={styles.instructionItemText}>
              Dont' exit app directly from exam screen, that may cause problems
              to resume from the point you stopped
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={[styles.content, styles.actionContent]}>
          <TouchableOpacity onPress={() => true}>
            <View style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Resume Exam</Text>
              <Icon
                color={color.white}
                size={16}
                name="arrow-right-circle-outline"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
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
    alignItems: 'flex-start',
  },
  instructionsHead: {
    fontSize: 15,
    color: color.text,
    marginBottom: 4,
  },
  instructionItem: {
    flexDirection: 'row',
    marginLeft: 6,
    marginTop: 4,
    alignItems: 'flex-start',
  },
  instructionItemText: {
    fontSize: 11,
    color: color.textLight,
    marginLeft: 4,
    flex: 1,
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
    backgroundColor: color.orangeDark,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: color.white,
    marginRight: 6,
  },
});

export default ResumeExam;
