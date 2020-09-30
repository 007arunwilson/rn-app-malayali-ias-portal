import * as subscriptionApi from '../../services/subscription';
import * as types from '../types/subscribe';
import { Navigation } from 'react-native-navigation';
import { navComponents } from '../../navigation';

const updateAvailableSubscriptionsByIndex = (payload) => (dispatch) =>
  dispatch({
    type: types.availableSubscriptionByIndex,
    payload,
  });

const updateAvailableSubscriptionsLoading = (payload) => (dispatch) =>
  dispatch({
    type: types.availableSubscriptionLoading,
    payload,
  });

const updateSelectedSubscription = (payload) => (dispatch) =>
  dispatch({
    type: types.selectedSubscription,
    payload,
  });

const getSubscriptionsAvailable = () =>
  subscriptionApi.getSubscriptionsAvailable();

const loadSubscriptionsAvailable = () => (dispatch) => {
  dispatch(updateAvailableSubscriptionsLoading(true));
  getSubscriptionsAvailable().then((result) => {
    dispatch(updateAvailableSubscriptionsByIndex(result));
    dispatch(updateAvailableSubscriptionsLoading(false));
  });
};

const createSubscriptionTransaction = (payload) =>
  new Promise((resolve, reject) => {
    const queryParam = {
      return: [
        'gatewayOrderId',
        'gatewayTransactionKey',
        'transactionReferenceId',
      ],
    };
    const data = {
      entity_id: payload.subscription_id,
      entity_type_value: 1,
      amount: payload.current_price,
    };
    subscriptionApi
      .createSubscriptionTransaction({ queryParam, data })
      .then((result) => {
        resolve(result);
      });
  });

const createUserSubscription = (payload) =>
  new Promise((resolve, reject) => {
    const data = {
      subscription_id: payload.subscriptionId,
      status_value: 1,
      transaction: {
        status_value: 1,
        transaction_reference_id: payload.transactionReferenceId,
      },
    };
    subscriptionApi.createUserSubscription({ data }).then((result) => {
      resolve(result);
    });
  });

const selectSubscription = (payload) => (dispatch) => {
  dispatch(updateSelectedSubscription(payload));
  Navigation.push('subscribe', navComponents.subscribeSelection);
};

export {
  updateAvailableSubscriptionsByIndex,
  updateAvailableSubscriptionsLoading,
  createSubscriptionTransaction,
  getSubscriptionsAvailable,
  loadSubscriptionsAvailable,
  createUserSubscription,
  selectSubscription,
};
