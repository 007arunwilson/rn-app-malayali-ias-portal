/**
 * @format
 * @flow strict-local
 */
import React, { useState } from 'react';
import {
    View,
    Image,
    ActivityIndicator
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Item = ({ item, index }) => {

    console.log('item:', item);

    const [loaded, setLoaded] = useState(false);

    return (
        <View
            style={{
                position: "relative",
                justifyContent: "center",
                width: wp(25),
            }}
        >
            <Image
                style={{
                    width: wp(23),
                    height: wp(23),
                    alignSelf: "center"
                }}
                source={{ uri: item }} //typeof item === "string" ? { uri: item } :
                resizeMethod={"resize"}
                resizeMode={"cover"}
                onLoad={() => { }}
                onLoadStart={() => { }}
                onLoadEnd={() => {
                    setLoaded(true);
                }}
            />
            {!loaded && (
                <ActivityIndicator
                    size="large"
                    color={"#E91E63"}
                    style={{
                        position: "absolute",
                        alignSelf: "center"
                    }}
                />
            )}
        </View>
    );
}

export default Item;
