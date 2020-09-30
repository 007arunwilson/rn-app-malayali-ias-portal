/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { color } from '../../config';

const keyExtractor = (item) => `_${item.package_id}`;

const renderItem = ({ item }) => {
  const title = item.package_title;
  let description = '';
  const descriptionSplitted = item.package_description.split(' ');
  if (descriptionSplitted.length > 18) {
    description = `${descriptionSplitted.slice(0, 16).join(' ')} ...`;
  } else {
    description = item.package_description;
  }

  return (
    <View style={styles.item}>
      <View style={styles.top}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.bottom} />
    </View>
  );
};

const PackageList = ({ packages }) => {
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
    fontSize: 13,
    color: color.textLight,
    marginTop: 8,
  },
});

export default PackageList;
