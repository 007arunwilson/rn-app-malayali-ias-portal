/**
 * @format
 * @flow strict-local
 */
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../../config';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Card = ({ videoItem, onVideoPress }) => {
  const { title } = videoItem;
  const {
    learning_material_video_meta: { thumbnail },
  } = videoItem;

  let titleText = '';
  const titleSplitted = title.split(' ');
  if (titleSplitted.length > 6) {
    titleText = `${titleSplitted.slice(0, 4).join(' ')} ...`;
  } else {
    titleText = title;
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => onVideoPress(videoItem)}
        activeOpacity={0.6}
        style={styles.card}>
        <View style={styles.lhs}>
          <ImageBackground
            style={styles.thumbnail}
            source={{ uri: thumbnail }}
            imageStyle={styles.thumbnailImage}>
            <Icon color={color.white} size={40} name="play-circle-outline" />
          </ImageBackground>
        </View>
        <View style={styles.rhs}>
          <Text style={styles.title}>{titleText}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 2,
    borderRadius: 4,
    flexDirection: 'row',
    width: wp(48),
  },
  lhs: {},
  thumbnail: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailImage: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  rhs: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    color: color.text,
    fontSize: 14,
  },
  description: {
    color: color.text,
    fontSize: 10,
  },
});

export default Card;
