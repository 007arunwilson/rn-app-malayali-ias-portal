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
import { color } from '../../../config';

const images = Array(5).fill(1).map((_, index) => `https://quditinfotech.s3.amazonaws.com/slider${index + 1}.jpeg`);

const ImageSlider = (props) => {
    const onViewRef = React.useRef((viewableItems) => { })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer} >
                <Text style={styles.title} >Our courses</Text>
            </View>
            <FlatList
                data={images}
                onViewableItemsChanged={onViewRef.current}
                renderItem={({ item, index }) => <Item item={item} index={index} />}
                keyExtractor={(item, index) => `-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment={"start"}
                snapToInterval={wp(25)}
                decelerationRate={"fast"}
                pagingEnabled
                viewabilityConfig={viewConfigRef.current}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginVertical: 8,
    },
    titleContainer: {
        alignSelf: 'stretch',
        marginBottom: 4,
    },
    title: {
        paddingHorizontal: 6,
        fontSize: 16,
        color: color.textLight,
        fontWeight: 'bold'
    },
});

export default ImageSlider;
