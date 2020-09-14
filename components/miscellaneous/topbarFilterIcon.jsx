/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../config';
import { useSelector } from 'react-redux';

const TopbarFilterIcon = () => {

    const { filterMenuToggled } = useSelector((state) => state.app);

    return filterMenuToggled ?
        (<TouchableOpacity onPress={() => true} style={styles.container}>
            <Icon color={color.primaryText} size={26} name={'filter-minus-outline'} />
        </TouchableOpacity>) : (<TouchableOpacity onPress={() => true} style={styles.container}>
            <Icon color={color.primaryText} size={26} name={'filter-menu-outline'} />
        </TouchableOpacity>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: 'transparent', // To avoid not taking padding glitch
    },
});

export default TopbarFilterIcon;
