import * as axios from '../helpers/axios';

const getPackageExamsCount = ({ params, urlParams }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: `/package/${urlParams.packageId}/learning-material/exams/count`,
        method: 'GET',
        params,
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

const getPackageExamsWithUserAttempt = ({ params, urlParams }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: `/package/${urlParams.packageId}/learning-material/exams/with-user-attempt`,
        method: 'GET',
        params,
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


const getFilterDataCstItemIds = ({ params, urlParams }) => new Promise((resolve, reject) => {
  axios.auth
    .request({
      url: `/package/${urlParams.packageId}/learning-material/exams/filter-data/cst-item-ids`,
      method: 'GET',
      params,
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

export { getPackageExamsCount, getPackageExamsWithUserAttempt, getFilterDataCstItemIds };
