/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { color } from '../../config';
import SubscriptionCard from '../../components/miscellaneous/subscriptionCard/intro';

const keyExtractor = (item) => `_${item.subscription_id}`;

const renderItem = ({ item }) => <SubscriptionCard subscriptionItem={item} />;

const ActiveSubscriptionsList = ({ activeSubscriptions }) => {
  return (
    <FlatList
      data={activeSubscriptions}
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

export default ActiveSubscriptionsList;
