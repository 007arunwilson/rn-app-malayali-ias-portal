/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { color } from '../../config';

const PackageList = ({ packages, handlePackageSelection }) => {
  const keyExtractor = (item) => `_${item.package_id}`;

  const renderItem = ({ item }) => {
    const title = item.package_title;
    const description = item.package_description;

    return (
      <TouchableOpacity
        onPress={() => handlePackageSelection(item)}
        style={styles.item}>
        <View style={styles.top}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.bottom} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={packages}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.backgroundLight,
    alignItems: 'stretch',
    paddingHorizontal: wp(8),
    flexGrow: 1,
  },
  item: {
    marginTop: 6,
    marginBottom: 22,
    backgroundColor: color.white,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4,
  },
  top: {},
  bottom: {},
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: color.text,
  },
  description: {
    fontSize: 11,
    color: color.textLight,
    marginTop: 8,
  },
});

export default PackageList;
