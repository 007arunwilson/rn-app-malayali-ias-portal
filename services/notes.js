import * as axios from '../helpers/axios';

const getPackageNotesCount = ({ params, urlParams }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: `/package/${urlParams.packageId}/learning-material/notes/count`,
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

const getPackageNotes = ({ params, urlParams }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: `/package/${urlParams.packageId}/learning-material/notes`,
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

export { getPackageNotesCount, getPackageNotes };
