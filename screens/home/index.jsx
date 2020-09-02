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

const Home = () => {
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
          <ScrollView contentContainerStyles={styles.container} />
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: color.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
