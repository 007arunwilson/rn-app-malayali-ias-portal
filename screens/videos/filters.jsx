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
    const { filter, setFilter, onFilterChange } = props;
    const { byTypeValue, byParentId } = useSelector((state) => state.masters.cstItems);
    const { cstItemIds: filterDataCstItemIds } = useSelector((state) => state.videos.filterData);
    const { activePackageCstItemIds: { [0]: activePackageCstItemId } } = useSelector((state) => state.app); // Getting first cst item id as acive course

    const onSubjectChange = (itemValue) => {
        setFilter({ subjectId: itemValue, topicId: null });
        onFilterChange(itemValue);
    }

    const onTopciChange = (itemValue) => {
        setFilter(state => ({ ...state, topicId: itemValue }))
        onFilterChange(itemValue || filter.subjectId);
    }

    const subjectSelectables = React.useMemo(() => {
        return byParentId[activePackageCstItemId].filter(item => filterDataCstItemIds.indexOf(item.id) !== -1);
    }, [byTypeValue, activePackageCstItemId]);

    const topicSelectables = React.useMemo(() => {
        return byParentId[filter.subjectId] && byParentId[filter.subjectId].length > 1 ? byParentId[filter.subjectId] : null;
    }, [byTypeValue, activePackageCstItemId, filter.subjectId]);


    return subjectSelectables.length ? (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.content}>
                    <Text style={styles.title} >Show videos by</Text>
                    <View style={styles.itemContainerWrapper} >
                        <View style={styles.itemContainer} >
                            <View style={styles.item} >
                                <Text style={styles.itemLabel} >Subject : </Text>
                                <Picker
                                    selectedValue={filter.subjectId}
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
                                        selectedValue={filter.topicId}
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
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.backgroundLight,
        paddingBottom: 6,
    },
    card: {
        backgroundColor: color.dimWhite,
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        elevation: 1,
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
        textAlign: 'right',
        fontWeight: 'bold'
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
