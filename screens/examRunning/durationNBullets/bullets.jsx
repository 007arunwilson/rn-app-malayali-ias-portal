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
  const questions = useSelector((state) => state.exam.running.questions);
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
    if (flatlistRef.current && activeQuestionIndex) {
      flatlistRef.current.scrollToIndex({
        animated: true,
        index: activeQuestionIndex,
      });
    }
  }, [activeQuestionIndex, flatlistRef]);

  const switchToQuestionByIndex = (questionIndex) =>
    dispatch(examRunningActions.setActiveQuestionByIndex(questionIndex));

  const renderBulletItem = ({ index, item }) => (
    <TouchableWithoutFeedback
      activeOpacity={0.5}
      onPress={() => switchToQuestionByIndex(index)}>
      <View
        style={[
          styles.item,
          item.id === activeQuestionId ? styles.itemActive : null,
          questionsChoosedOptionIds[item.id] ? styles.itemEngaged : null,
        ]}>
        <Text
          style={[
            styles.itemText,
            item.id === activeQuestionId ? { color: color.primaryText } : null,
            questionsChoosedOptionIds[item.id] ? { color: color.text } : null,
          ]}>
          {index + 1}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

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
    borderColor: color.backgroundDark,
    backgroundColor: color.white,
  },
  itemText: {
    fontSize: 12,
    color: color.text,
  },
  itemEngaged: {
    backgroundColor: color.backgroundDark,
  },
  itemActive: {
    borderColor: color.primaryLight,
    backgroundColor: color.primary,
  },
});

export default Bullets;