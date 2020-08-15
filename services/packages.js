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

export { getPackages };
