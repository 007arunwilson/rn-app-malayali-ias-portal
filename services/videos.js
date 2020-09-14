import * as axios from '../helpers/axios';

const getPackageVideosCount = ({ params, urlParams }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: `/package/${urlParams.packageId}/learning-material/videos/count`,
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

const getPackageVideos = ({ params, urlParams }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: `/package/${urlParams.packageId}/learning-material/videos`,
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
      url: `/package/${urlParams.packageId}/learning-material/videos/filter-data/cst-item-ids`,
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

export { getPackageVideosCount, getPackageVideos, getFilterDataCstItemIds };
