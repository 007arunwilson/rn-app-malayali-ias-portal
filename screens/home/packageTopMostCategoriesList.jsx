/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { color } from '../../config';
import { Navigation } from 'react-native-navigation';
import { navComponents, bindPassProps } from '../../navigation';

const packageTopMostCategoriesList = ({ categories }) => {
  const navigateToNotes = (item) => {
    Navigation.push(
      'home',
      bindPassProps({ category: item }, navComponents.notes),
    );
  };

  return (
    <View style={styles.container}>
      {categories.map((item, index) => {
        let descriptionText = '';
        const descriptionSplitted = item.description.split(' ');
        if (descriptionSplitted.length > 14) {
          descriptionText = `${descriptionSplitted.slice(0, 20).join(' ')} ...`;
        } else {
          descriptionText = item.description;
        }

        return (
          <View key={`_${item.category_id}`} style={styles.item}>
            <View style={styles.top}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{descriptionText}</Text>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigateToNotes(item)}>
                <View style={[styles.actionButton, styles.actionPaynowButton]}>
                  <Text style={styles.actionButtonText}>View all</Text>
                  <Icon
                    color={color.white}
                    size={16}
                    name={'arrow-right-circle-outline'}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    paddingHorizontal: wp(8),
  },
  item: {
    marginTop: 6,
    marginBottom: 22,
    backgroundColor: color.white,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 1,
  },
  top: {},
  bottom: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.text,
  },
  description: {
    fontSize: 12,
    color: color.textLight,
    marginTop: 8,
  },
  actionButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionResultToggleButton: {
    backgroundColor: color.primary,
  },
  actionPaynowButton: {
    backgroundColor: color.primary,
  },
  actionButtonText: {
    color: color.white,
    marginRight: 6,
  },
});

export default packageTopMostCategoriesList;
