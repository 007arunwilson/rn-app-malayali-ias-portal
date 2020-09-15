/**
 * @format
 * @flow strict-local
 */
import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    TouchableHighlight,
    Dimensions,
    FlatList
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../../config';



const ImageInSlider = ({ item, index, componentId }) => {

    const [loaded, setLoaded] = useState(false);

    const onCurrentImagePressedHandler = () => {
        console.log(`${item.id} is clicked`)
    }

    return (
        <View
            style={{
                position: "relative",
                justifyContent: "center",
                width: wp(100)
            }}
        >
            <TouchableHighlight
                key={index}
                disabled={false}
                onPress={onCurrentImagePressedHandler}
                underlayColor={'transparent'}
            >
                <Image
                    style={styles.sliderImg}
                    source={item} //typeof item === "string" ? { uri: item } :
                    resizeMethod={"resize"}
                    resizeMode={"cover"}
                    onLoad={() => { }}
                    onLoadStart={() => { }}
                    onLoadEnd={() => {
                        setLoaded(true);
                    }}
                />
            </TouchableHighlight>
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

const Slider = (props) => {
    // let flatListRef;


    const getBgImg = (i) => {
        switch (i) {
            case 0:
                return {
                    uri: "https://picsum.photos/" + Math.floor(Math.random() * (999 - 100 + 1) + 100)
                }
            case 1:
                return {
                    uri: "https://picsum.photos/" + Math.floor(Math.random() * (999 - 100 + 1) + 100)
                }
            case 2:
                return {
                    uri: "https://picsum.photos/" + Math.floor(Math.random() * (999 - 100 + 1) + 100)
                }
            case 3:
                return {
                    uri: "https://picsum.photos/" + Math.floor(Math.random() * (999 - 100 + 1) + 100)
                }
            default:
                return {
                    uri: "https://picsum.photos/" + Math.floor(Math.random() * (999 - 100 + 1) + 100)
                }
        }
    }

    const onViewRef = React.useRef((viewableItems) => {
        // console.log(viewableItems)
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{'Louis'}</Text>
            <FlatList
                // ref={ref => { flatListRef = ref }}
                data={[...Array(8)].map((_, i) => getBgImg(i))}
                onViewableItemsChanged={onViewRef.current}
                renderItem={({ item, index }) => <ImageInSlider item={item} index={index} {...props} />}
                keyExtractor={(item, index) => `-${index}`}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                snapToAlignment={"start"}
                snapToInterval={wp(100)}
                decelerationRate={"fast"}
                pagingEnabled
                // style={{flex: 0.6}}
                viewabilityConfig={viewConfigRef.current}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 0.4,
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    titleText: {
        flex: 1,
        color: "#ffffff",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        fontSize: 18,
        fontWeight: "700"
    },
    sliderImg: {
        width: wp(100),
        height: wp(80),
        alignSelf: "flex-start"
    },
});

export default Slider;
