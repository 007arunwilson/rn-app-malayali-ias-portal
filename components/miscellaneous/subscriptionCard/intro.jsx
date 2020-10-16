/**
 * @format
 * @flow strict-local
 */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import moment from 'moment';
import { color } from '../../../config';

const SubscriptionCard = ({
  subscriptionItem,
  onSubscriptionSelect,
  options,
}) => {
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
            {subscriptionItem.current_price > 0 ? (
              <>
                <Text style={styles.pricePrefix}>₹</Text>
                <Text style={styles.priceText}>
                  {subscriptionItem.current_price}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.priceText}>Free</Text>
              </>
            )}
            <Text style={styles.splitText}>/</Text>
            {subscriptionItem.subscription_duration > 0 ? (
              <>
                <Text style={styles.dayText}>
                  {subscriptionItem.subscription_duration}
                </Text>
                <Text style={styles.dayPostfix}>days</Text>
              </>
            ) : (
              <>
                <Text style={styles.dayPostfix}>Lifetime</Text>
              </>
            )}
          </View>
          {(subscriptionItem.begin_at || subscriptionItem.expire_at) && (
            <View style={styles.durationLiveContainer}>
              {subscriptionItem.begin_at && (
                <View style={styles.durationLive}>
                  <Text style={styles.durationLiveLabel}>Started on: </Text>
                  <Text style={styles.durationLiveValue}>
                    {moment(subscriptionItem.begin_at).format(
                      ' MMM Do YYYY, h:mm a',
                    )}
                  </Text>
                </View>
              )}
              {subscriptionItem.expire_at && (
                <View style={styles.durationLive}>
                  <Text style={styles.durationLiveLabel}>Expire on: </Text>
                  <Text style={styles.durationLiveValue}>
                    {moment(subscriptionItem.expire_at).format(
                      ' MMM Do YYYY, h:mm a',
                    )}
                  </Text>
                </View>
              )}
            </View>
          )}
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
  durationLiveContainer: {
    marginTop: 20,
  },
  durationLive: {
    paddingBottom: 8,
    flexDirection: 'column',
  },
  durationLiveLabel: {
    color: color.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  durationLiveValue: {
    color: color.primary,
    fontSize: 13,
  },
});

export default SubscriptionCard;
