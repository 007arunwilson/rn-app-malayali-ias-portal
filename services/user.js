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

export { getUser };
