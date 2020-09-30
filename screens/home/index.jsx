/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { color } from '../../config';
import * as appActions from '../../store/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import NotSubscribedAlert from './notSubscribedAlert';
import Banner from './banner';
import ImageSlider from './imageSlider';
import VideoSlider from './videosSlider';
import ExamsSlider from './examsSlider';
import NotesSlider from './notesSlider';
import FullscreenMessage from '../../components/miscellaneous/fullScreenMessage';
import PackageTopMostCategoriesList from './packageTopMostCategoriesList';

const Home = (props) => {
  const dispatch = useDispatch();
  const homeScreenDataLoaded = useSelector(
    (state) => state.app.homeScreenDataLoaded,
  );

  const {
    loading: topMostCategoriesLoading,
    byIndex: topMostCategories,
  } = useSelector((state) => state.home.packageTopMostParentCategories);

  React.useEffect(() => {
    dispatch(appActions.populateHomeScreenData());
    //appActions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!homeScreenDataLoaded ? (
        <FullscreenMessage
          indicator
          text={
            topMostCategoriesLoading
              ? 'Please wait ...'
              : 'Loading subscriptions ...'
          }
        />
      ) : null}
      {homeScreenDataLoaded &&
      !topMostCategoriesLoading &&
      topMostCategories ? (
        <>
          <ScrollView
            style={styles.scrollview}
            contentContainerStyles={styles.container}>
            <PackageTopMostCategoriesList categories={topMostCategories} />
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
    flexGrow: 1,
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
