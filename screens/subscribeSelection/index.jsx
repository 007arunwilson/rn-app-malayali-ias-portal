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
  loadHavePaidSubscription,
} from '../../store/actions/subscription';
import { Navigation } from 'react-native-navigation';
import { navComponents } from '../../navigation';
import { processPackageSelection } from '../../store/actions/packageSelecton';

const SubscribeSelection = () => {
  const dispatch = useDispatch();
  const { selectedSubscription } = useSelector((state) => state.subscription);
  const [paynowProgressing, setPaynowProgressing] = useState(false);

  const paynowActionHandler = () => {
    setPaynowProgressing(true);
    createSubscriptionTransaction(selectedSubscription).then((result) => {
      (selectedSubscription.current_price > 0
        ? RazorpayCheckout.open({
            description: 'Subscribe ',
            image: config.razorProductLogoUrl,
            currency: config.razorPaymentCurrency,
            key: result.gatewayTransactionKey,
            amount: selectedSubscription.current_price,
            name: config.instituteName,
            order_id: result.gatewayOrderId,
            theme: { color: color.primary },
          })
        : Promise.resolve()
      )
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
          dispatch(loadHavePaidSubscription()); // Updating user's paid suscription status
          return dispatch(
            processPackageSelection(selectedSubscription.package_id), // Switching to new package
          ).then(() => {
            Navigation.setRoot({ root: navComponents.home });
          });
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
      <SubscriptionIntro showDetail subscriptionItem={selectedSubscription} />
      <SubscriptionActionButton
        paynowActionHandler={paynowActionHandler}
        paynowProgressing={paynowProgressing}
        selectedSubscription={selectedSubscription}
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
      text: 'Continue to payment',
    },
  },
};

export default SubscribeSelection;
