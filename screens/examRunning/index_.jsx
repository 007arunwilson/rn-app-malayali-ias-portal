/**
 * @format
 * @flow strict-local
 */
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../config';
import HTMLrender from '../../components/miscellaneous/htmlRender';

const ExamRunning = () => {
  const flatlistRef = React.useRef(null);

  const renderQuestionBulletItems = ({ item, index, activeQuestionIndex }) => {
    console.log('index', index);

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => switchToIndex(index)}>
        <View
          style={[
            styles.bulletItem,
            index > 4
              ? {
                backgroundColor: '#EAECEE',
              }
              : null,
            activeQuestionIndex === index
              ? {
                borderColor: '#2C3E50',
                backgroundColor: '#34495E',
              }
              : null,
          ]}>
          <Text
            style={[
              styles.bulletItemText,
              activeQuestionIndex === index
                ? {
                  color: '#EBEDEF',
                }
                : null,
            ]}>
            {index + 1}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.content}>
          <Text style={styles.examTitleText}>{'Louis philip'}</Text>
          </View>
        </View>

        <View style={styles.section1Container}>
          <View style={styles.section1Inner}>
            <View style={styles.durationContainer}>
              <Icon color={color.text} size={14} name="clock-outline" />
              <Text style={styles.durationText}>{`${23}:${22}`}</Text>
            </View>

            <FlatList
              ref={(ref) => {
                flatlistRef.current = ref;
              }}
              extraData={{
                activeQuestionIndex: 0,
              }}
              data={[
                { id: 0 },
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 },
                { id: 6 },
                { id: 7 },
                { id: 8 },
                { id: 9 },
                { id: 10 },
                { id: 11 },
                { id: 12 },
                { id: 13 },
                { id: 14 },
                { id: 15 },
                { id: 16 },
                { id: 17 },
                { id: 18 },
                { id: 19 },
              ]}
              horizontal
              renderItem={(renderProps) =>
                renderQuestionBulletItems({
                  ...renderProps,
                  activeQuestionIndex: 0,
                })
              }
              keyExtractor={(item) => `_${item.id}`}
              style={styles.questionBulletItemsList}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        <ScrollView>
          <View style={styles.section2Container}>
            <View style={styles.section2TopContainer}>
              <Text style={styles.section2TopText1}>Q: </Text>
              <Text style={styles.section2TopText2}>
                {1}/{10}
              </Text>
            </View>
            <View style={styles.questionTextContainer}>
              <HTMLrender
                content={
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
                }
              />
            </View>
          </View>
        </ScrollView>
        <ScrollView>
          <View style={styles.section3Container}>
            {[
              { id: 1, option_text: 'Master Lousi master  decarpico' },
              { id: 2, option_text: 'Merins Lousi master  decarpico' },
              { id: 3, option_text: 'Mouris Lousi master  decarpico' },
              { id: 4, option_text: 'Whether Lousi master  decarpico' },
              { id: 5, option_text: 'Cardiac Lousi master  decarpico' },
              { id: 6, option_text: 'Merins Lousi master  decarpico' },
              { id: 7, option_text: 'Mouris Lousi master  decarpico' },
              { id: 8, option_text: 'Whether Lousi master  decarpico' },
              { id: 9, option_text: 'Cardiac Lousi master  decarpico' },
            ].map((optionItem) => {
              return (
                <TouchableOpacity
                  key={`_${optionItem.id}`}
                  onPress={() => answerChooseHandler(optionItem.id)}>
                  <View style={styles.optionItem}>
                    <Icon
                      style={styles.optionItemIcon}
                      color={'#273746'}
                      size={16}
                      name={
                        optionItem.id == 2
                          ? 'check-circle-outline'
                          : 'circle-outline'
                      }
                    />
                    <View style={styles.optionItemTextContainer}>
                      <Text style={styles.optionItemText}>
                        {optionItem.option_text}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.section4Container}>
          <View style={styles.section4Inner}>
            <View style={styles.section4LHSContainer}>
              <TouchableWithoutFeedback onPress={() => true}>
                <View style={styles.exitButton}>
                  <Text style={styles.exitButtonText}>Exit exam</Text>
                  <Icon color={'#EBEDEF'} size={16} name="pause-circle" />
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.section4RHSContainer}>
              <TouchableWithoutFeedback disabled={!1} onPress={() => true}>
                <View
                  style={[
                    styles.previousQuestionButtton,
                    !1 ? { opacity: 0.2 } : null,
                  ]}>
                  <Icon color={'#2C3E50'} size={16} name="chevron-left" />
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback disabled={!1} onPress={() => true}>
                <View
                  style={[
                    styles.nextQuestionButton,
                    !1 ? { opacity: 0.2 } : null,
                  ]}>
                  <Icon color={'#2C3E50'} size={16} name="chevron-right" />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundLight,
  },
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
  titleSectionContainer: {
    marginHorizontal: 20,
    paddingVertical: 12,
  },
  examTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  section1Container: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
  },
  section1Inner: {
    flexDirection: 'row',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    marginLeft: 6,
    color: '#566573',
  },
  bulletItem: {
    borderWidth: 1,
    width: 26,
    height: 26,
    marginHorizontal: 2,
    marginVertical: 4,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#D5D8DC',
  },
  bulletItemText: {
    fontSize: 12,
    color: '#273746',
  },
  questionBulletItemsList: {
    flex: 1,
    marginHorizontal: 10,
  },
  section2Container: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
  },
  section2TopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  section2TopText1: {
    color: '#273746',
  },
  section2TopText2: {
    color: '#273746',
  },
  questionTextContainer: {
    marginTop: 8,
    paddingHorizontal: 6,
    borderRadius: 6,
    backgroundColor: '#FBFCFC',
  },
  section3Container: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
  },
  optionItem: {
    flexDirection: 'row',
    marginLeft: 6,
    marginBottom: 6,
    alignItems: 'center',
    borderColor: '#808B96',
    padding: 2,
    borderRadius: 6,
  },
  optionItemIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  optionItemTextContainer: {
    flex: 1,
  },
  optionItemText: {
    fontSize: 11,
    color: '#212F3D',
  },
  section4Container: {
    marginHorizontal: 20,
    marginBottom: 12,
    marginTop: 12,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
  },
  section4Inner: {
    flexDirection: 'row',
  },
  section4LHSContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  pauseButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#EBEDEF',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseButtonText: {
    color: '#2C3E50',
    marginRight: 6,
  },
  exitButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#34495E',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButtonText: {
    color: '#EBEDEF',
    marginRight: 6,
  },
  section4RHSContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 0.5,
  },
  previousQuestionButtton: {
    backgroundColor: '#EBEDEF',
    width: 32,
    height: 32,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextQuestionButton: {
    backgroundColor: '#EBEDEF',
    width: 32,
    height: 32,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

ExamRunning.options = {
  topBar: {
    title: {
      text: 'Exam',
    },
  },
};

export default ExamRunning;
