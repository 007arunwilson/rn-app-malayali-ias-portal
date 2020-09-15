/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import React from 'react';
import { color } from '../../config';
import * as appActions from '../../store/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import FullscreenLoader from '../../components/miscellaneous/fullscreenLoader';
import NotSubscribedAlert from './notSubscribedAlert';
import Banner from './banner';
import ImageSlider from './imageSlider';
import VideoSlider from './videosSlider';
import ExamsSlider from './examsSlider';
import NotesSlider from './notesSlider';

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

  return (
    <>
      {!homeScreenDataLoaded ? <FullscreenLoader /> : null}
      {homeScreenDataLoaded ? (
        <>
          {!subscribedUser ? <NotSubscribedAlert /> : null}
          <ScrollView
            style={styles.scrollview}
            contentContainerStyles={styles.container}>
            <Banner url={'https://quditinfotech.s3.amazonaws.com/banner.jpeg'} />
            <VideoSlider />
            <ExamsSlider />
            <NotesSlider />
            <ImageSlider />

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
    alignSelf: 'center',
  },
});

Home.options = {
  topBar: {
    rightButtons: [
      {
        id: 'profile',
        component: {
          name: 'topbar.menuIcon',
          aligment: 'center',
        },
      },
    ],
    title: {
      text: 'Home',
    },
  },
};

export default Home;
