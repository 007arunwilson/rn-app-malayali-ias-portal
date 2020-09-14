/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { color } from '../../config';
import { Picker } from '@react-native-community/picker';
import { useSelector } from 'react-redux';

const Filters = (props) => {
    const { onFilterChange } = props; 
    const [subjectId, setSubjectId] = React.useState(null);
    const [topicId, setTopicId] = React.useState(null);
    const { byTypeValue, byParentId } = useSelector((state) => state.masters.cstItems);
    const { activePackageCstItemIds: { [0]: activePackageCstItemId } } = useSelector((state) => state.app); // Getting first cst item id as acive course

    const onSubjectChange = (itemValue) => {
        setSubjectId(itemValue);
        onFilterChange(itemValue);
    }

    const onTopciChange = (itemValue) => {
        setTopicId(itemValue);
        onFilterChange(itemValue || subjectId);
    }

    const subjectSelectables = React.useMemo(() => {
        return byParentId[activePackageCstItemId];
    }, [byTypeValue, activePackageCstItemId]);

    const topicSelectables = React.useMemo(() => {
        return byParentId[subjectId] && byParentId[subjectId].length > 1 ? byParentId[subjectId] : null;
    }, [byTypeValue, activePackageCstItemId, subjectId]);


    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.content}>
                    <Text style={styles.title} >Show videos by</Text>
                    <View style={styles.itemContainerWrapper} >
                        <View style={styles.itemContainer} >
                            <View style={styles.item} >
                                <Text style={styles.itemLabel} >Subject : </Text>
                                <Picker
                                    selectedValue={subjectId}
                                    style={styles.picker}
                                    itemStyle={styles.pickerItem}
                                    onValueChange={onSubjectChange}>
                                    <Picker.Item label={'All'} color={color.textLight} value={null} />
                                    {subjectSelectables && subjectSelectables.length && subjectSelectables.map(subjectSelectable => {
                                        return <Picker.Item key={`-${subjectSelectable.id}`} label={subjectSelectable.title} value={subjectSelectable.id} />;
                                    })}
                                </Picker>
                            </View>
                            {topicSelectables && topicSelectables.length && (
                                <View style={styles.item} >
                                    <Text style={styles.itemLabel} >Topic : </Text>
                                    <Picker
                                        selectedValue={topicId}
                                        style={styles.picker}
                                        itemStyle={styles.pickerItem}
                                        onValueChange={onTopciChange}>
                                        <Picker.Item label={'All'} color={color.textLight} value={null} />
                                        {topicSelectables && topicSelectables.length && topicSelectables.map(topicSelectable => {
                                            return <Picker.Item key={`-${topicSelectable.id}`} label={topicSelectable.title} value={topicSelectable.id} />;
                                        })}
                                    </Picker>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.backgroundLight,
        paddingBottom: 6,
    },
    card: {
        backgroundColor: color.white,
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        elevation: 2,
        borderRadius: 4,
        marginHorizontal: 24,
        marginTop: 12,
    },
    content: {
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 12,
        color: color.textLight,
    },
    itemContainerWrapper: {
        flexDirection: 'row',
    },
    itemContainer: {
        marginTop: 4,
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
    },
    itemLabel: {
        fontSize: 13,
        flex: 1,
        textAlign: 'right'
    },
    picker: {
        height: 24,
        flex: 3,
    },
    pickerItem: {
        fontSize: 10,
        color: 'red'
    }
});

export default Filters;
