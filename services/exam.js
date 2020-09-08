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

const deleteUserAttempts = ({ urlParams }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: `/learning-material/test/${urlParams.learningMaterialTestId}/user-attempts`,
        method: 'DELETE',
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

const createUserAttempt = ({ urlParams }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: `/learning-material/test/${urlParams.learningMaterialTestId}/user-attempt`,
        method: 'POST',
      })
      .then(
        ({ data: { data: responseData } }) => {
          resolve(responseData[0]);
        },
        (error) => {
          reject(error);
        },
      );
  });

const getQuestions = ({ urlParams }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: `/learning-material/test/${urlParams.testId}/questions`,
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

const getQuestionCategories = ({ urlParams }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: `/learning-material/test/${urlParams.testId}/questions/cst-items`,
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

const submitExam = ({ urlParams, data }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: `/learning-material/test/${urlParams.testId}/submit-test`,
        method: 'POST',
        data,
      })
      .then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        },
      );
  });

export {
  getExam,
  getUserAttempt,
  getQuestions,
  getQuestionCategories,
  submitExam,
  createUserAttempt,
  deleteUserAttempts,
};
