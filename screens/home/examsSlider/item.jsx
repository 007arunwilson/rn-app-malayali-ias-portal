/**
 * @format
 * @flow strict-local
 */
import React, { useState } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Card from './card';

const Item = ({ item, onExamSelect }) => {

    return (
        <View style={styles.item}>
            <Card onExamSelect={onExamSelect} examItem={item} />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        position: "relative",
        justifyContent: "center",
        width: wp(50),
        paddingHorizontal: 4,
        height: 90,
    }
});

export default Item;
