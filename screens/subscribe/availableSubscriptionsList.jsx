/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { color } from '../../config';
import SubscriptionCardIntro from '../../components/miscellaneous/subscriptionCard/intro';

const AvailableSubscriptionsList = (props) => {
  const { availableSubscriptions: subscriptions, onSubscriptionSelect } = props;

  const renderItem = ({ item }) => (
    <SubscriptionCardIntro
      onSubscriptionSelect={onSubscriptionSelect}
      subscriptionItem={item}
    />
  );

  const keyExtractor = (item) => `_${item.subscription_id}`;

  return (
    <FlatList
      data={subscriptions}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.list}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: color.backgroundLight,
  },
  listContainer: {
    paddingVertical: 10,
  },
});

export default AvailableSubscriptionsList;
