/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Banner = (props) => {
  return <Image style={styles.image} source={{ uri: props.url }} />;
};

const styles = StyleSheet.create({
  image: {
    width: wp(100),
    height: wp(70),
    marginTop: 4,
    resizeMode: 'contain',
  },
});

export default Banner;
