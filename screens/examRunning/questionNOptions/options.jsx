/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import HTMLrender from '../../../components/miscellaneous/htmlRender';
import { color } from '../../../config';

const Options = (props) => {
  const {
    options,
    optionChooseHanlder,
    questionsChoosedOptionIds,
    isReview,
    reviewQuestionsChoosedOptions,
    reviewQuestionsAnswerOptionIds,
    question,
  } = props;

  if (!isReview) {
    return (
      <>
        <ScrollView
          contentContainerStyle={styles.containerContent}
          style={styles.container}>
          {options.map((item) => {
            return (
              <TouchableOpacity
                style={styles.container}
                key={`_${item.id}`}
                onPress={() => optionChooseHanlder(item)}>
                <View style={styles.item}>
                  <Icon
                    style={styles.itemIcon}
                    color={color.text}
                    size={16}
                    name={
                      questionsChoosedOptionIds[
                        item.learning_material_test_question_id
                      ] &&
                      questionsChoosedOptionIds[
                        item.learning_material_test_question_id
                      ] == item.id
                        ? 'checkbox-marked-circle-outline'
                        : 'circle-outline'
                    }
                  />
                  <View style={styles.itemTextContainer}>
                    <HTMLrender content={`${item.option_text}`} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </>
    );
  } else {
    return (
      <>
        <ScrollView
          contentContainerStyle={styles.containerContent}
          style={styles.container}>
          {options.map((item) => {
            let itemIcon = 'circle-outline';
            const itemStyle = [styles.item];
            const itemIconStyle = [styles.itemIcon];
            if (
              reviewQuestionsAnswerOptionIds[question.id] === item.id &&
              item.id ===
                (reviewQuestionsChoosedOptions[question.id] &&
                  reviewQuestionsChoosedOptions[question.id]
                    .learning_material_test_question_option_id)
            ) {
              // Answered, this is right, this is choosed
              itemIcon = 'checkbox-marked-circle-outline';
              itemIconStyle.push(styles.itemIconRight);
            } else if (
              reviewQuestionsAnswerOptionIds[question.id] === item.id &&
              reviewQuestionsChoosedOptions[question.id] &&
              item.id !==
                reviewQuestionsChoosedOptions[question.id]
                  .learning_material_test_question_option_id
            ) {
              // Answered, this is right, but choosed something else
              itemIcon = 'checkbox-marked-circle-outline';
              itemIconStyle.push(styles.itemIconRight);
            } else if (
              !reviewQuestionsChoosedOptions[question.id] &&
              item.id === reviewQuestionsAnswerOptionIds[question.id]
            ) {
              // Not Answered, but right
              itemIcon = 'checkbox-marked-circle-outline';
            } else if (
              reviewQuestionsChoosedOptions[question.id] &&
              reviewQuestionsChoosedOptions[question.id]
                .learning_material_test_question_option_id === item.id &&
              item.id !== reviewQuestionsAnswerOptionIds[question.id]
            ) {
              // Answered, this is choosed, but right is something else
              itemIcon = 'close-circle-outline';
              itemIconStyle.push(styles.itemIconWrong);
            } else {
              itemStyle.push(styles.itemFaded);
            }

            return (
              <TouchableOpacity style={styles.container} key={`_${item.id}`}>
                <View style={itemStyle}>
                  <Icon
                    style={itemIconStyle}
                    color={color.text}
                    size={16}
                    name={itemIcon}
                  />
                  <View style={styles.itemTextContainer}>
                    <HTMLrender content={item.option_text} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  containerContent: {
    paddingBottom: 16,
  },
  item: {
    flexDirection: 'row',
    marginLeft: 6,
    marginBottom: 6,
    alignItems: 'flex-start',
    borderColor: color.textLight,
    padding: 2,
    borderRadius: 6,
    alignSelf: 'stretch',
  },
  itemFaded: {
    opacity: 0.4,
  },
  itemIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  itemIconRight: {
    color: color.greenDark,
  },
  itemIconWrong: {
    color: color.redDark,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 11,
    color: color.text,
  },
});

export default Options;
