/**
 * @format
 * @flow strict-local
 */
import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native';

// import Video from 'react-native-video';
import Player from 'react-native-video-controls';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useOrientation } from '../helpers/hooks';

const VideoPlayer = (props) => {
  const [isPotrait] = useOrientation();

  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          isPotrait ? styles.potraitContainer : styles.landscapeContainer,
        ]}>
        <Player
          source={{
            uri:
              'https://player.vimeo.com/external/450994640.m3u8?s=c34349aef8ebb2bea7516bdf973cfecfdd472830&oauth2_token_id=1356536406',
          }}
          videoStyle={[styles.video]}
          useTextureView={true}
          onBack={false}
          disableBack
          disableVolume
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#FDFEFE',
  },
  potraitContainer: {
    height: hp(100),
    width: wp(100),
    paddingBottom: 20,
  },
  landscapeContainer: {
    width: hp(100),
    height: wp(100),
    paddingBottom: 20,
  },
  video: {
    backgroundColor: 'black',
  },
  potraitVideo: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * (9 / 16),
  },
  landscapeVideo: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});

VideoPlayer.options = {
  topBar: {
    visible: false,
  },
};

export default VideoPlayer;
