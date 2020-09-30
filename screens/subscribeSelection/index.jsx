/**
 * @format
 * @flow strict-local
 */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import { StyleSheet, ScrollView } from 'react-native';
import SubscriptionIntro from '../../components/miscellaneous/subscriptionCard/intro';
import SubscriptionActionButton from '../../components/miscellaneous/subscriptionCard/actionButton';
import config, { color } from '../../config';
import {
  createSubscriptionTransaction,
  createUserSubscription,
} from '../../store/actions/subscribe';
import { Navigation } from 'react-native-navigation';
import { navComponents } from '../../navigation';
// import FullscreenTextLoader from '../../components/miscellaneous/fullscreenTextLoader';
// import { loadSubscriptionsAvailable } from '../../store/actions/subscribe';
// import AvailableSubscriptionsList from './availableSubscriptionsList';

const SubscribeSelection = () => {
  //   const dispatch = useDispatch();
  const { selectedSubscription } = useSelector((state) => state.subscribe);
  const [paynowProgressing, setPaynowProgressing] = useState(false);

  React.useEffect(() => {
    // dispatch(loadSubscriptionsAvailable());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paynowActionHandler = () => {
    setPaynowProgressing(true);
    createSubscriptionTransaction(selectedSubscription).then((result) => {
      RazorpayCheckout.open({
        description: 'Subscribe ',
        image: config.razorProductLogoUrl,
        currency: config.razorPaymentCurrency,
        key: result.gatewayTransactionKey,
        amount: selectedSubscription.current_price,
        name: config.instituteName,
        order_id: result.gatewayOrderId,
        theme: { color: color.primary },
      })
        .then(
          () =>
            createUserSubscription({
              subscriptionId: selectedSubscription.subscription_id,
              transactionReferenceId: result.transactionReferenceId,
            }),
          (error) => {
            console.log('error', error);
          },
        )
        .then(() => {
          Navigation.setRoot({ root: navComponents.home });
        })
        .finally(() => {
          setPaynowProgressing(false);
        });
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={'always'}>
      <SubscriptionIntro subscriptionItem={selectedSubscription} />
      <SubscriptionActionButton
        paynowActionHandler={paynowActionHandler}
        paynowProgressing={paynowProgressing}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    alignItems: 'center',
    flexGrow: 1,
  },
});

// RNN options
SubscribeSelection.options = {
  topBar: {
    title: {
      text: 'Continue to payment',
    },
    // subtitle: {
    //   text: 'Choose a package to continue',
    // },
  },
};

export default SubscribeSelection;
