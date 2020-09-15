/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import React from 'react';
import Card from '../../components/miscellaneous/card';

const Cards = () => {

    const onExamsCardPress = () => {
        Navigation.push('home', navComponents.exams);
    };

    const onVideosCardPress = () => {
        Navigation.push('home', navComponents.videos);
    };

    const onNotesCardPress = () => {
        Navigation.push('home', navComponents.notes);
    };

    return (
        <View style={styles.cardsContainer}>
            <Card text={'Videos'} onPress={onVideosCardPress} />
            <Card text={'Exams'} onPress={onExamsCardPress} />
            <Card text={'Notes'} onPress={onNotesCardPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    cardsContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default Cards;
