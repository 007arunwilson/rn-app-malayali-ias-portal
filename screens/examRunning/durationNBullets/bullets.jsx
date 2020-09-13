/**
 * @format
 * @flow strict-local
 */
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as examRunningActions from '../../../store/actions/exam/running';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../../config';

const Bullets = (props) => {
  const dispatch = useDispatch();
  const flatlistRef = React.useRef(null);
  const { questions, isReview } = useSelector((state) => state.exam.running);
  const questionsChoosedOptionIds = useSelector(
    (state) => state.exam.running.questionsChoosedOptionIds,
  );
  const activeQuestionId = useSelector(
    (state) =>
      state.exam.running.activeQuestion && state.exam.running.activeQuestion.id,
  );

  const activeQuestionIndex = useSelector(
    (state) => state.exam.running.activeQuestionIndex,
  );

  React.useEffect(() => {
    if (flatlistRef.current && (activeQuestionIndex || activeQuestionIndex === 0)) {
      flatlistRef.current.scrollToIndex({
        animated: true,
        index: activeQuestionIndex,
      });
    }
  }, [activeQuestionIndex, flatlistRef]);

  const switchToQuestionByIndex = (questionIndex) =>
    dispatch(examRunningActions.setActiveQuestionByIndex(questionIndex));

  const renderBulletItem = ({ index, item }) => {
    if (!isReview) {
      return (
        <TouchableWithoutFeedback
          activeOpacity={0.5}
          onPress={() => switchToQuestionByIndex(index)}>
          <View
            style={[
              styles.item,
              questionsChoosedOptionIds[item.id] ? styles.itemEngaged : null,
              item.id === activeQuestionId ? styles.itemActive : null,
            ]}>
            <Text
              style={[
                styles.itemText,
                item.id === activeQuestionId
                  ? { color: color.primaryText }
                  : null,
                questionsChoosedOptionIds[item.id]
                  ? { color: color.white }
                  : null,
              ]}>
              {index + 1}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          activeOpacity={0.5}
          onPress={() => switchToQuestionByIndex(index)}>
          <View
            style={[
              styles.item,
              styles.itemReview,
              item.id === activeQuestionId ? styles.itemActive : null,
            ]}>
            <Text
              style={[
                styles.itemText,
                styles.itemReviewText,
                item.id === activeQuestionId
                  ? { color: color.primaryText }
                  : null,
                questionsChoosedOptionIds[item.id]
                  ? { color: color.white }
                  : null,
              ]}>
              {index + 1}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  };

  const keyExtractor = (item) => `-${item.id}`;

  return (
    <FlatList
      extraData={activeQuestionId}
      ref={(ref) => {
        flatlistRef.current = ref;
      }}
      data={questions}
      horizontal
      renderItem={(renderProps) =>
        renderBulletItem({
          ...renderProps,
          activeQuestionId,
        })
      }
      keyExtractor={keyExtractor}
      style={styles.list}
      contentContainerStyle={styles.listInnerContainer}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: color.backgroundLight,
    borderRadius: 4,
  },
  listInnerContainer: {
    paddingHorizontal: 4,
  },
  item: {
    borderWidth: 1,
    width: 26,
    height: 26,
    marginHorizontal: 2,
    marginVertical: 4,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.redLight,
    backgroundColor: color.redLight,
  },
  itemReview: {
    borderColor: color.primaryLight,
    backgroundColor: color.primaryText,
  },
  itemText: {
    fontSize: 12,
    color: color.white,
  },
  itemReviewText: {
    color: color.primaryDark,
  },
  itemEngaged: {
    backgroundColor: color.greenDark,
    borderColor: color.greenLight,
  },
  itemActive: {
    borderColor: color.primaryLight,
    backgroundColor: color.primary,
  },
});

export default Bullets;
