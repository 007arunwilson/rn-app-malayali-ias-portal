import * as axios from '../helpers/axios';

const getUser = () =>
  new Promise((resolve, reject) => {
    axios.noAuth
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

export { getUser, getUserPackages };
