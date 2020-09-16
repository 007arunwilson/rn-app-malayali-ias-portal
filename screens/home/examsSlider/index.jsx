/**
 * @format
 * @flow strict-local
 */
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Item from './item';
import { useSelector, useDispatch } from 'react-redux';
import { getPackageExamsWithUserAttempt } from '../../../services/exams';
import * as examsActions from '../../../store/actions/exams';
import { color } from '../../../config';
import { navComponents } from '../../../navigation';
import { Navigation } from 'react-native-navigation';

const ExamsSlider = () => {
  const dispatch = useDispatch();
  const { activePackageId } = useSelector((state) => state.app);

  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState(null);

  React.useEffect(() => {
    getPackageExamsWithUserAttempt({
      params: { page: 1, limit: 5 },
      urlParams: { packageId: activePackageId },
    }).then((result) => {
      setItems(result);
      setLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onExamSelect = (examItem) => {
    dispatch(
      examsActions.navigateToExam({
        examItem,
        navigation: {
          type: 'push',
          from: 'home',
        },
      }),
    );
  };

  const onExplorePress = () => {
    Navigation.push('home', navComponents.exams);
  };

  return loaded && items.length ? (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Latest Exams</Text>
      </View>
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <Item onExamSelect={onExamSelect} item={item} index={index} />
        )}
        keyExtractor={(item, index) => `-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'start'}
        snapToInterval={wp(50)}
        decelerationRate={'fast'}
        pagingEnabled
      />
      <Text onPress={onExplorePress} style={styles.exploreText}>
        View all
      </Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginVertical: 4,
  },
  titleContainer: {
    alignSelf: 'stretch',
  },
  title: {
    paddingHorizontal: 6,
    fontSize: 16,
    color: color.textLight,
    fontWeight: 'bold',
  },
  exploreText: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    textDecorationLine: 'underline',
    fontSize: 12,
  },
});

export default ExamsSlider;
