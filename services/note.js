import * as axios from '../helpers/axios';

const getNoteDownloadLink = ({ urlParams }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: `/learning-material/${urlParams.learningMaterialId}/note/download-link`,
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

export { getNoteDownloadLink };
