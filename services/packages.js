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

const getPackagesCategoriesByLearningMaterialType = ({ urlParams }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: `/package/${urlParams.packageId}/learning-material/by-type/${urlParams.typeValue}/categories`,
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

export { getPackages, getPackagesCategoriesByLearningMaterialType };
