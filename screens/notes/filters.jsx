/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, View, Text } from 'react-native';
import update from 'immutability-helper';
import React, { useEffect, useState } from 'react';
import { color } from '../../config';
import { Picker } from '@react-native-community/picker';

const Filters = (props) => {
  const { filterCategories, parentCategory, setFilterCategory } = props;
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const firstLevelFilter = filterCategories.filter(
      (item) => item.parent_id === parentCategory,
    );
    if (firstLevelFilter.length) {
      const firstLevelFilterLabel = firstLevelFilter[0].type_text;
      setFilters([
        {
          label: firstLevelFilterLabel,
          categories: firstLevelFilter,
          selected: null,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFilterChange = (itemValue, parentIndex) => {
    setFilters((state) => {
      let updatedState = update(state, {
        [parentIndex]: { selected: { $set: itemValue || null } },
      });

      if (parentIndex < updatedState.length - 1) {
        updatedState = update(updatedState, {
          $splice: [[parentIndex + 1, updatedState.length - parentIndex]],
        });
      }

      const childCategories = filterCategories.filter(
        (item) => item.parent_id === itemValue,
      );

      if (childCategories.length) {
        updatedState = update(updatedState, {
          $push: [
            {
              label: childCategories[0].type_text,
              categories: childCategories,
              selected: null,
            },
          ],
        });
      }

      if (!itemValue) {
        setFilterCategory(
          (updatedState[parentIndex - 1] &&
            updatedState[parentIndex - 1].selected) ||
            null,
        );
      } else {
      }

      setFilterCategory(
        itemValue ||
          (updatedState[parentIndex - 1] &&
            updatedState[parentIndex - 1].selected) ||
          null,
      );

      return updatedState;
    });
  };

  return filters.length ? (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.title}>Filter by :</Text>
          <View style={styles.itemContainerWrapper}>
            <View style={styles.itemContainer}>
              {filters.map((filterItem, parentIndex) => {
                return (
                  <View key={`-${filterItem.label}`} style={styles.item}>
                    <Text textBreakStrategy={'simple'} style={styles.itemLabel}>
                      {filterItem.label} :{' '}
                    </Text>
                    <Picker
                      selectedValue={filterItem.selected}
                      style={styles.picker}
                      itemStyle={styles.pickerItem}
                      onValueChange={(itemValue) =>
                        onFilterChange(itemValue, parentIndex)
                      }>
                      <Picker.Item
                        label={'All'}
                        color={color.textLight}
                        value={null}
                      />
                      {filterItem &&
                        filterItem.categories.length &&
                        filterItem.categories.map((filterSelectables) => {
                          return (
                            <Picker.Item
                              key={`-${filterSelectables.category_id}`}
                              label={filterSelectables.title}
                              value={filterSelectables.category_id}
                            />
                          );
                        })}
                    </Picker>
                  </View>
                );
              })}
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
    fontWeight: 'bold',
  },
  picker: {
    height: 24,
    flex: 2,
  },
  pickerItem: {
    fontSize: 10,
    color: 'red',
  },
});

export default Filters;
