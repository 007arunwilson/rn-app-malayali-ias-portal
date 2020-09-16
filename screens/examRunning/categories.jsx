/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { color } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveQuestionByIndex } from '../../store/actions/exam/running';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, activeCategoryId } = useSelector(
    (state) => state.exam.running,
  );

  if (categories.length < 2) {
    return null;
  } // Categories will only display if there is multiple

  const onCategorySelect = (category) =>
    dispatch(setActiveQuestionByIndex(category.questionsIndex[0]));

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        {categories.map((item) => {
          const questionsCount = item.questionsIndex.length;
          return (
            <TouchableWithoutFeedback
              key={`_${item.id}`}
              onPress={() => onCategorySelect(item)}>
              <View style={styles.item}>
                <Text
                  style={[
                    styles.itemText,
                    activeCategoryId === item.id && styles.itemActiveText,
                  ]}>
                  {item.title}
                </Text>
                <Text style={styles.countText}>({questionsCount})</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
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
    alignItems: 'flex-start',
  },
  item: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    flexDirection: 'row',
  },
  itemText: {
    textDecorationLine: 'underline',
    fontSize: 12,
  },
  itemActiveText: {
    textDecorationLine: 'none',
    fontSize: 15,
  },
  countText: {
    marginLeft: 6,
    fontSize: 12,
  },
});

export default Categories;
