import * as subscriptionApi from '../../services/subscription';
import * as types from '../types/subscription';
import { Navigation } from 'react-native-navigation';
import { navComponents } from '../../navigation';

const reset = () => (dispatch) =>
  dispatch({
    type: types.reset,
  });

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

const updateUserSubscriptionsPackageActiveByIndex = (payload) => (dispatch) =>
  dispatch({
    type: types.userSubscriptionsPackageActiveByIndex,
    payload,
  });

const updateUserSubscriptionsPackageActiveLoading = (payload) => (dispatch) =>
  dispatch({
    type: types.userSubscriptionsPackageActiveLoading,
    payload,
  });

const updateSelectedSubscription = (payload) => (dispatch) =>
  dispatch({
    type: types.selectedSubscription,
    payload,
  });

const updateHavePaidSubscription = (payload) => (dispatch) =>
  dispatch({
    type: types.havePaidSubscription,
    payload,
  });

const getSubscriptionsAvailable = () =>
  subscriptionApi.getSubscriptionsAvailable();

const getHavePaidSubscription = () => subscriptionApi.havePaidSubscription();

const getUserSubscriptionsPackageActive = () =>
  subscriptionApi.getUserSubscriptionsPackageActive();

const loadSubscriptionsAvailable = () => (dispatch) => {
  dispatch(updateAvailableSubscriptionsLoading(true));
  getSubscriptionsAvailable().then((result) => {
    dispatch(updateAvailableSubscriptionsByIndex(result));
    dispatch(updateAvailableSubscriptionsLoading(false));
  });
};

const loadUserSubscriptionsPackageActive = () => (dispatch) => {
  dispatch(updateUserSubscriptionsPackageActiveLoading(true));
  getUserSubscriptionsPackageActive().then((result) => {
    dispatch(updateUserSubscriptionsPackageActiveByIndex(result));
    dispatch(updateUserSubscriptionsPackageActiveLoading(false));
  });
};

const loadHavePaidSubscription = () => (dispatch) => {
  getHavePaidSubscription().then((result) =>
    dispatch(updateHavePaidSubscription(result)),
  );
};

const createSubscriptionTransaction = (payload) =>
  new Promise((resolve, reject) => {
    const queryParam = {
      return:
        payload.current_price > 0
          ? [
              'gatewayOrderId',
              'gatewayTransactionKey',
              'transactionReferenceId',
            ]
          : ['transactionReferenceId'],
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
  loadUserSubscriptionsPackageActive,
  updateUserSubscriptionsPackageActiveByIndex,
  createUserSubscription,
  selectSubscription,
  getHavePaidSubscription,
  loadHavePaidSubscription,
  reset,
};
