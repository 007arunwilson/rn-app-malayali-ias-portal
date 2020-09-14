import * as axios from '../helpers/axios';

const getPackages = () =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: '/packages',
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

const getPackagesCstItemIdsOfCourse = ({ urlParams }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: `/package/${urlParams.packageId}/cst-item-ids/by-type-course`,
        method: 'GET',
      })
      .then(
        ({ data: { data: responseData } }) => {
          resolve(responseData);
        },
        (error) => {
          reject(error);
        },
      );
  });

export { getPackages, getPackagesCstItemIdsOfCourse };
