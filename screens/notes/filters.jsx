/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { color } from '../../config';
import { Picker } from '@react-native-community/picker';

const Filters = (props) => {
  const { filterCategories, parentCategory } = props;
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const firstLevelFilter = filterCategories.filter(
      (item) => item.parent_id === parentCategory,
    );
    const firstLevelFilterLabel = firstLevelFilter[0].text;
    setFilters([
      { label: firstLevelFilterLabel, categories: firstLevelFilter },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return filterCategories.length ? (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.content} />
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
    fontWeight: 'bold',
  },
  picker: {
    height: 24,
    flex: 3,
  },
  pickerItem: {
    fontSize: 10,
    color: 'red',
  },
});

export default Filters;
