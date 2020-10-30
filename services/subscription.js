import * as axios from '../helpers/axios';

const getSubscriptionsAvailable = () =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: '/subscriptions/available',
        method: 'GET',
      })
      .then(
        ({ data: { data: responseData } }) => {
          if (responseData) {
            resolve(responseData);
          }
        },
        (error) => {
          reject(error);
        },
      );
  });

const havePaidSubscription = () =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: '/user/have-paid-subscription',
        method: 'GET',
      })
      .then(
        ({ data: { data: responseData } }) => {
          if (responseData) {
            resolve(responseData[0]);
          }
        },
        (error) => {
          reject(error);
        },
      );
  });

const getUserSubscriptionsPackageActive = () =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: '/user/subscriptions/package/active',
        method: 'GET',
      })
      .then(
        ({ data: { data: responseData } }) => {
          if (responseData) {
            resolve(responseData);
          }
        },
        (error) => {
          reject(error);
        },
      );
  });

const createSubscriptionTransaction = ({ queryParam, data }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: '/transaction',
        method: 'POST',
        data,
        params: queryParam,
      })
      .then(
        ({ data: { data: responseData } }) => {
          if (responseData) {
            resolve(responseData[0]);
          }
        },
        (error) => {
          reject(error);
        },
      );
  });

const createUserSubscription = ({ data }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: '/user/subscription/create',
        method: 'POST',
        data,
      })
      .then(
        ({ data: { data: responseData } }) => {
          if (responseData) {
            resolve(responseData[0]);
          }
        },
        (error) => {
          reject(error);
        },
      );
  });

export {
  getSubscriptionsAvailable,
  createSubscriptionTransaction,
  getUserSubscriptionsPackageActive,
  havePaidSubscription,
  createUserSubscription,
};
