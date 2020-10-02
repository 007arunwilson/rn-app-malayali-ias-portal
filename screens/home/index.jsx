/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, ScrollView } from 'react-native';
import React, { useMemo } from 'react';
import { color } from '../../config';
import * as appActions from '../../store/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import FullscreenMessage from '../../components/miscellaneous/fullScreenMessage';
import PackageTopMostCategoriesList from './packageTopMostCategoriesList';

const Home = (props) => {
  const dispatch = useDispatch();
  const homeScreenDataLoaded = useSelector(
    (state) => state.app.homeScreenDataLoaded,
  );

  const { byIndex: allCategories } = useSelector(
    (state) => state.app.activePackage.categoriesByLearningMaterial.notes,
  );

  React.useEffect(() => {
    dispatch(appActions.populateHomeScreenData());
    //appActions.
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
          <ScrollView
            style={styles.scrollview}
            contentContainerStyles={styles.container}>
            <PackageTopMostCategoriesList categories={homeCategories} />
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
