/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Banner = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: props.url }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
  image: {
    width: wp(100),
    height: wp(70),
    marginTop: 4,
    resizeMode: 'contain',
  },
});

export default Banner;
