import React from 'react';
import HTML from 'react-native-render-html';
import { Dimensions, View, StyleSheet } from 'react-native';
import { color } from '../../config';

const HTMLrender = (props) => {
  return (
    <View>
      <HTML
        html={props.content}
        baseFontStyle={styles.baseFont}
        imagesMaxWidth={(Dimensions.get('window').width / 100) * 70}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  p: {
    color: color.text,
    fontSize: 12.5,
  },
  baseFont: {
    fontSize: 12.5,
    color: color.text,
  },
});

export default HTMLrender;
