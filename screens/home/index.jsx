/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import React from 'react';
import { color } from '../../config';
import * as appActions from '../../store/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import FullscreenLoader from '../../components/miscellaneous/fullscreenLoader';
import NotSubscribedAlert from './notSubscribedAlert';
import Card from '../../components/miscellaneous/card';

const Home = (props) => {
  const dispatch = useDispatch();
  const homeScreenDataLoaded = useSelector(
    (state) => state.app.homeScreenDataLoaded,
  );
  const subscribedUser = useSelector((state) => state.app.subscribedUser);

  React.useEffect(() => {
    dispatch(appActions.populateHomeScreenData());
    //appActions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onExamsCardPress = () => { };

  const onVideosCardPress = () => { };

  const onNotesCardPress = () => { };

  return (
    <>
      {!homeScreenDataLoaded ? <FullscreenLoader /> : null}
      {homeScreenDataLoaded ? (
        <>
          {!subscribedUser ? <NotSubscribedAlert /> : null}
          <ScrollView
            style={styles.scrollview}
            contentContainerStyles={styles.container}>
            <View style={styles.cardsContainer}>
              <Card text={'Exams'} onPress={onExamsCardPress} />
              <Card text={'Videos'} onPress={onVideosCardPress} />
              <Card text={'Notes'} onPress={onNotesCardPress} />
            </View>
          </ScrollView>
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  scrollview: {
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
  },
  cardsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: 'red',
  },
});

Home.options = {
  topBar: {
    // rightButtons: [
    //   {
    //     id: 'profile',
    //     component: {
    //       name: 'topbar.icon',
    //       aligment: 'center',
    //       passProps: {
    //         icon: 'account-circle',
    //       },
    //     },
    //   },
    // ],
    // rightButtonColor: color.primaryText,
    title: {
      text: 'Home',
    },
  },
};

export default Home;
