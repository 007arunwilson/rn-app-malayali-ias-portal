/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { color } from '../config';

const Home = () => {
  // const dispatch = useDispatch();

  React.useEffect(() => {
    console.log('Home data');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
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
