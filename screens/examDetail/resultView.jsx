/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { color } from '../../config';
import InlineLoader from '../../components/miscellaneous/inlineLoader';

const ResultView = (props) => {
  const {
    examAttemptData: {
      startedOn,
      submittedOn,
      answeredQuestion,
      rightlyAnswered,
      totalScore,
      negativeScore,
      optainedScore,
    },
    questionsCount,
    processStartExam,
    loadingQuestions,
  } = props;

  const [showResult, setShowResult] = React.useState(false);

  return (
    <>
      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.bottomLhsRow}>
            <Icon color={color.textLight} size={14} name="calendar-outline" />
            <Text style={styles.rowText}>
              Started on:{moment(startedOn).format(' MMMM Do YYYY, h:mm:ss a')}
            </Text>
          </View>
          <View style={styles.bottomLhsRow}>
            <Icon color={color.textLight} size={14} name="calendar-check" />
            <Text style={styles.rowText}>
              Submitted on:
              {moment(submittedOn).format(' MMMM Do YYYY, h:mm:ss a')}
            </Text>
          </View>
        </View>
      </View>

      {showResult ? (
        <>
          <View style={styles.card}>
            <View style={[styles.content]}>
              <Text style={styles.resultLabel}>
                <Text>Obtained Score: </Text>
                <Text style={styles.resultValue}>
                  {optainedScore || 0}/{totalScore || 0}
                </Text>
              </Text>

              <Text style={styles.resultLabel}>
                <Text>Answered Questions: </Text>
                <Text style={styles.resultValue}>
                  {answeredQuestion || 0}/{questionsCount}
                </Text>
              </Text>

              <Text style={styles.resultLabel}>
                <Text>Rightly Answered: </Text>
                <Text style={styles.resultValue}>
                  {rightlyAnswered || 0}/{answeredQuestion || 0}
                </Text>
              </Text>

              <Text style={styles.resultLabel}>
                <Text>Negative Score: </Text>
                <Text style={styles.resultValue}>{negativeScore || 0}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={[styles.content, styles.actionContent]}>
              {loadingQuestions ? (
                <View style={styles.loadingQuestions}>
                  <InlineLoader />
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => processStartExam(true)}>
                  <View
                    style={[styles.actionButton, styles.actionReviewButton]}>
                    <Text style={styles.actionButtonText}>Review Result</Text>
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
      ) : null}

      <View style={styles.card}>
        <View style={[styles.content, styles.actionContent]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowResult(!showResult)}>
            <View
              style={[styles.actionButton, styles.actionResultToggleButton]}>
              <Text style={styles.actionButtonText}>
                {!showResult ? 'Show' : 'Hide'} Result
              </Text>
              <Icon
                color={color.white}
                size={16}
                name={`arrow-${!showResult ? 'down' : 'up'}-circle-outline`}
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
  bottomLhsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    fontSize: 12,
    marginLeft: 2,
    color: color.textLight,
  },
  initialActivityText: {
    fontSize: 12,
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
  actionReviewButton: {
    backgroundColor: color.orangeDark,
  },
  actionButtonText: {
    color: color.white,
    marginRight: 6,
  },
  resultLabel: {
    fontSize: 13,
  },
  resultValue: {
    fontSize: 16,
  },
});

export default ResultView;
