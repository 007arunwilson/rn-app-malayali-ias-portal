/**
 * @format
 * @flow strict-local
 */
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Item from './item';
import { useSelector } from 'react-redux';
import { getPackageVideos } from '../../../services/videos';
import { color } from '../../../config';
import { navComponents, bindPassProps } from '../../../navigation';
import { Navigation } from 'react-native-navigation';

const images = Array(5).fill(1).map((_, index) => `https://quditinfotech.s3.amazonaws.com/slider${index + 1}.jpeg`);

const VideoSlider = () => {
    const { activePackageId } = useSelector(state => state.app);

    const [loaded, setLoaded] = useState(false);
    const [items, setItems] = useState(null);

    React.useEffect(() => {
        getPackageVideos({ params: { page: 1, limit: 5 }, urlParams: { packageId: activePackageId } })
            .then(result => {
                setItems(result);
                setLoaded(true);
            });
    }, []);

    const onVideoPress = (videoItem) => {
        Navigation.push(
            'home',
            bindPassProps({ videoItem }, navComponents.videoPlayer),
        );
    };


    const onExplorePress = () => {
        Navigation.push(
            'home', navComponents.videos
        );
    };

    return loaded && items.length ? (
        <View style={styles.container}>
            <View style={styles.titleContainer} >
                <Text style={styles.title} >Latest Videos</Text>
            </View>
            <FlatList
                data={items}
                renderItem={({ item, index }) => <Item onVideoPress={onVideoPress} item={item} index={index} />}
                keyExtractor={(item, index) => `-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment={"start"}
                snapToInterval={wp(50)}
                decelerationRate={"fast"}
                pagingEnabled
            />
            <Text onPress={onExplorePress} style={styles.exploreText} >View all</Text>
        </View>
    ) : null;

}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "flex-end",
        marginVertical: 4,
    },
    titleContainer: {
        alignSelf: 'stretch',
    },
    title: {
        paddingHorizontal: 6,
        fontSize: 16,
        color: color.textLight,
        fontWeight: 'bold'
    },
    exploreText: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        textDecorationLine: 'underline',
        fontSize: 12,
    }
});

export default VideoSlider;