/**
 * @format
 * @flow strict-local
 */
import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { color } from '../../../config';

const Item = ({ item }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={styles.item}>
      <Image
        style={styles.image}
        source={{ uri: item }} //typeof item === "string" ? { uri: item } :
        resizeMethod={'resize'}
        resizeMode={'cover'}
        onLoad={() => {}}
        onLoadStart={() => {}}
        onLoadEnd={() => {
          setLoaded(true);
        }}
      />
      {!loaded && (
        <ActivityIndicator
          size="large"
          color={color.secondary}
          style={styles.loadIndicator}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    position: 'relative',
    justifyContent: 'center',
    width: wp(25),
  },
  image: {
    width: wp(23),
    height: wp(23),
    alignSelf: 'center',
  },
  loadIndicator: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default Item;
