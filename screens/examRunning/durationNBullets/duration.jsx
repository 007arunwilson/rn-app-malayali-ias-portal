/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text, SafeAreaView, Alert } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../../config';
import { useSelector, useDispatch } from 'react-redux';
import * as examRunningActions from '../../../store/actions/exam/running';

const Duration = (props) => {
  const dispatch = useDispatch();
  const { exitExam } = props;
  const { timer, isReview } = useSelector((state) => state.exam.running);
  const timerRef = React.useRef(timer);
  const timerIntervelRef = React.useRef(null);

  React.useEffect(() => {
    if (!isReview) {
      timerIntervelRef.current = setInterval(() => {
        timerRef.current--;
        dispatch(examRunningActions.updateTimer(timerRef.current));
        if (timerRef.current === 0) {
          exitExam(true);
        }
      }, 1000);
    }
  }, [dispatch, exitExam, isReview]);

  React.useEffect(
    () => () =>
      !isReview &&
      timerIntervelRef.current &&
      clearTimeout(timerIntervelRef.current),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (isReview) {
    return null;
  } else {
    const remainingTime = ['00', '00'];
    // Calculating time remaining
    const minutesInt = parseInt(timer / 60, 10);
    remainingTime[0] =
      `${minutesInt}`.length === 1 ? `0${minutesInt}` : `${minutesInt}`;
    const secondsMode = timer % 60;
    remainingTime[1] =
      `${secondsMode}`.length === 1 ? `0${secondsMode}` : `${secondsMode}`;

    return (
      <View style={styles.container}>
        <Icon color={color.text} size={14} name="clock-outline" />
        <Text
          style={styles.text}>{`${remainingTime[0]}:${remainingTime[1]}`}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: color.text,
    marginLeft: 10,
  },
});

export default Duration;
