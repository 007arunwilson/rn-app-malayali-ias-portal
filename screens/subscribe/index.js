/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FullscreenTextLoader from '../../components/miscellaneous/fullscreenTextLoader';
import { loadSubscriptionsAvailable, selectSubscription } from '../../store/actions/subscribe';
import AvailableSubscriptionsList from './availableSubscriptionsList';

const Subscribe = () => {
  const dispatch = useDispatch();

  const { byIndex: availableSubscriptions, loading } = useSelector(
    (state) => state.subscribe.availableSubscriptions,
  );

  React.useEffect(() => {
    dispatch(loadSubscriptionsAvailable());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubscriptionSelect = (subscriptionItem) => {
    dispatch(selectSubscription(subscriptionItem));
  };

  return (
    <>
      {loading || availableSubscriptions === null ? (
        <FullscreenTextLoader />
      ) : !loading && availableSubscriptions.length ? (
        <AvailableSubscriptionsList
          availableSubscriptions={availableSubscriptions}
          onSubscriptionSelect={onSubscriptionSelect}
        />
      ) : null}
    </>
  );
};

// RNN options
Subscribe.options = {
  topBar: {
    title: {
      text: 'Subscribe',
    },
    subtitle: {
      text: 'Choose a package to continue',
    },
  },
};

export default Subscribe;
