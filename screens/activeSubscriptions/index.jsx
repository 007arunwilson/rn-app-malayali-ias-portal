/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import { useSelector } from 'react-redux';
import ActiveSubscriptionsList from './activeSubscriptionsList';

const ActiveSubscriptions = () => {
  const activeSubscriptions = useSelector(
    (state) => state.subscription.userSubscriptionsPackageActive.byIndex,
  );

  return <ActiveSubscriptionsList activeSubscriptions={activeSubscriptions} />;
};

// RNN options
ActiveSubscriptions.options = {
  topBar: {
    rightButtons: [
      {
        id: 'profile',
        component: {
          name: 'topbar.menuIcon',
          aligment: 'center',
        },
      },
    ],
    title: {
      text: 'Active Subscriptions',
    },
  },
};

export default ActiveSubscriptions;
