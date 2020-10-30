/**
 * @format
 * @flow strict-local
 */
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FullscreenTextLoader from '../../components/miscellaneous/fullscreenTextLoader';
import {
  loadSubscriptionsAvailable,
  loadUserSubscriptionsPackageActive,
  selectSubscription,
  reset,
} from '../../store/actions/subscription';
import AvailableSubscriptionsList from './availableSubscriptionsList';
import FullscreenMessage from '../../components/miscellaneous/fullScreenMessage';

const Subscribe = () => {
  const dispatch = useDispatch();

  const {
    byIndex: availableSubscriptions,
    loading: availableSubscriptionsLoading,
  } = useSelector((state) => state.subscription.availableSubscriptions);

  const {
    byIndex: userSubscriptionsPackageActive,
    loading: userSubscriptionsPackageActiveLoading,
  } = useSelector((state) => state.subscription.userSubscriptionsPackageActive);

  React.useEffect(() => {
    dispatch(reset()); // Loading fresh data by clearning reducer
    dispatch(loadSubscriptionsAvailable());
    dispatch(loadUserSubscriptionsPackageActive());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubscriptionSelect = (subscriptionItem) => {
    dispatch(selectSubscription(subscriptionItem));
  };

  const filteredSubscriptions = useMemo(() => {
    const filterSubscriptionIds = [];
    if (
      userSubscriptionsPackageActive &&
      userSubscriptionsPackageActive.length
    ) {
      userSubscriptionsPackageActive.forEach((element) => {
        filterSubscriptionIds.push(element.subscription_id);
      });
    }

    return availableSubscriptions
      ? availableSubscriptions.filter(
          (item) => filterSubscriptionIds.indexOf(item.subscription_id) === -1,
        )
      : [];
  }, [userSubscriptionsPackageActive, availableSubscriptions]);

  return (
    <>
      {availableSubscriptionsLoading ||
      availableSubscriptions === null ||
      userSubscriptionsPackageActiveLoading ||
      userSubscriptionsPackageActive === null ? (
        <FullscreenTextLoader />
      ) : filteredSubscriptions.length ? (
        <AvailableSubscriptionsList
          availableSubscriptions={filteredSubscriptions}
          onSubscriptionSelect={onSubscriptionSelect}
        />
      ) : (
        <FullscreenMessage
          text={'There is no subscriptions availble for you'}
        />
      )}
    </>
  );
};

// RNN options
Subscribe.options = {
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
      text: 'Subscribe',
    },
    subtitle: {
      text: 'Choose a package to continue',
    },
  },
};

export default Subscribe;
