import * as axios from '../helpers/axios';

const getUser = () =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: '/user',
        method: 'GET',
      })
      .then(
        ({ data: { data: responseData } }) => {
          if (responseData && responseData[0]) {
            resolve(responseData[0]);
          }
        },
        (error) => {
          reject(error);
        },
      );
  });

const getUserPackages = () =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: '/user/packages',
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

const enrollToDefaultPackage = () =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: '/user/package/add-to-default',
        method: 'POST',
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

const createUser = ({ data }) =>
  new Promise((resolve, reject) => {
    axios.noAuth
      .request({
        url: '/user',
        method: 'POST',
        data,
      })
      .then(
        ({ data: { data: responseData } }) => {
          if (responseData && responseData[0]) {
            resolve(responseData[0]);
          }
        },
        (error) => {
          reject(error);
        },
      );
  });

const updateUser = ({ data }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: '/user',
        method: 'PATCH',
        data,
      })
      .then(
        ({ data: { data: responseData } }) => {
          if (responseData && responseData[0]) {
            resolve(responseData[0]);
          }
        },
        (error) => {
          reject(error);
        },
      );
  });

export {
  getUser,
  getUserPackages,
  createUser,
  updateUser,
  enrollToDefaultPackage,
};
