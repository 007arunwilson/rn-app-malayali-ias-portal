/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { color } from '../../../config';

const SubscriptionCard = ({ subscriptionItem, onSubscriptionSelect }) => {
  let {
    package_title: title,
    package_description: description,
  } = subscriptionItem;

  let titleText = '';
  const titleSplitted = title.split(' ');
  if (titleSplitted.length > 6) {
    titleText = `${titleSplitted.slice(0, 4).join(' ')} ...`;
  } else {
    titleText = title;
  }

  let descriptionText = '';
  const descriptionSplitted = description.split(' ');
  if (descriptionSplitted.length > 14) {
    descriptionText = `${descriptionSplitted.slice(0, 20).join(' ')} ...`;
  } else {
    descriptionText = description;
  }

  return (
    <>
      <TouchableOpacity
        onPress={
          onSubscriptionSelect
            ? () => onSubscriptionSelect(subscriptionItem)
            : null
        }
        style={styles.card}>
        <View style={styles.top}>
          <Text style={styles.title}>{titleText}</Text>
          <Text style={styles.description}>{descriptionText}</Text>
          <View style={styles.priceDurationCard}>
            <Text style={styles.pricePrefix}>₹</Text>
            <Text style={styles.priceText}>
              {subscriptionItem.current_price}
            </Text>
            <Text style={styles.splitText}>/</Text>
            <Text style={styles.dayText}>
              {subscriptionItem.subscription_duration}
            </Text>
            <Text style={styles.dayPostfix}>days</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 2,
    borderRadius: 4,
    marginHorizontal: 24,
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  top: {
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    color: color.text,
    fontSize: 20,
    textAlign: 'left',
  },
  priceDurationCard: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 12,
    backgroundColor: color.shadowWhite,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pricePrefix: { color: color.textLight, fontSize: 14, marginRight: 4 },
  priceText: {
    color: color.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 2,
  },
  splitText: { color: color.greyLight, fontSize: 24, marginRight: 2 },
  dayText: {
    color: color.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
  dayPostfix: { color: color.textLight, marginRight: 4, fontSize: 12 },
  description: {
    marginVertical: 8,
    color: color.text,
    fontSize: 11,
  },
});

export default SubscriptionCard;
