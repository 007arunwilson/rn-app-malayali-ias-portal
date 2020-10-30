import React from 'react';
import HTML from 'react-native-render-html';
import { Dimensions, View, StyleSheet } from 'react-native';
import { color } from '../../config';

const HTMLrender = (props) => {
  const renderers = {
    sup: (_, children) => {
      return <View style={styles.supView}>{children}</View>;
    },
    sub: (_, children) => {
      return (
        <View style={styles.subView}>
          <View style={styles.subMock}>{children}</View>
          <View style={styles.subValue}>{children}</View>
        </View>
      );
    },
  };

  return (
    <View>
      <HTML
        html={props.content}
        renderers={renderers}
        baseFontStyle={styles.baseFont}
        imagesMaxWidth={(Dimensions.get('window').width / 100) * 70}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  baseFont: {
    fontSize: 14,
    color: color.text,
  },
  supView: {
    color: color.text,
    // No idea how this part works ( wondering how a color style absence crashes app ), but if this removed app crash
  },
  subView: {
    color: 'red',
    borderColor: 'red',
    flexDirection: 'row',
    position: 'relative',
    bottom: -48,
  },
  subMock: {
    opacity: 0,
  },
  subValue: {
    position: 'absolute',
    bottom: -10,
    flexDirection: 'row',
  },
});

export default HTMLrender;
