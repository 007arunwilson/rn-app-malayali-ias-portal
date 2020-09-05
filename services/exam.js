import * as axios from '../helpers/axios';

const getExam = ({ urlParams }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: `/learning-material/${urlParams.learningMaterialId}/test`,
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

const getUserAttempt = ({ urlParams }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: `/learning-material/test/${urlParams.learningMaterialTestId}/user-attempts`,
        method: 'GET',
      })
      .then(
        ({ data: { data: responseData } }) => {
          if (responseData) {
            resolve(responseData[0]);
          } else {
            resolve(null);
          }
        },
        (error) => {
          reject(error);
        },
      );
  });

export { getExam, getUserAttempt };
