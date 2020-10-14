/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import React, { useMemo } from 'react';
import { color } from '../../config';
import * as appActions from '../../store/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import FullscreenMessage from '../../components/miscellaneous/fullScreenMessage';
import PackageTopMostCategoriesList from './packageTopMostCategoriesList';
import HomeCategoryTileView from './homeCategoryTileView';
import LatestNotes from './latestNotes';

const Home = (props) => {
  const dispatch = useDispatch();
  const {
    homeScreenDataLoaded,
    activePackage: { id: activePakcageId },
  } = useSelector((state) => state.app);

  const userDisplayName = useSelector((state) => state.user.name);
  const { byIndex: allCategories } = useSelector(
    (state) => state.app.activePackage.categoriesByLearningMaterial.notes,
  );

  React.useEffect(() => {
    dispatch(appActions.populateHomeScreenData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const homeCategories = useMemo(
    () => allCategories && allCategories.filter((item) => !item.parent_id),
    [allCategories],
  );

  return (
    <>
      {!homeScreenDataLoaded ? (
        <FullscreenMessage indicator text={'Please wait ...'} />
      ) : null}
      {homeScreenDataLoaded && homeCategories ? (
        <>
          <View style={styles.welcomeMessageContainer}>
            <Text style={styles.welcomeText}>Welcome home, </Text>
            <Text style={styles.userDisplayName}>{userDisplayName}</Text>
          </View>
          <ScrollView
            style={styles.scrollview}
            contentContainerStyles={styles.container}>
            <HomeCategoryTileView categories={homeCategories} />
            <LatestNotes packageId={activePakcageId} />
          </ScrollView>
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  welcomeMessageContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 36,
  },
  welcomeText: {
    fontSize: 26,
    color: '#C3C9D4',
    fontWeight: 'bold',
  },
  userDisplayName: {
    color: '#67758E',
    fontSize: 24,
    marginLeft: 10,
  },
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
