import * as axios from '../helpers/axios';
import * as helperUtils from '../helpers/utils';

const getPackageNotesCount = ({ params, urlParams }) =>
  axios.auth
    .request({
      url: `/package/${urlParams.packageId}/learning-material/by-type/3/count`,
      method: 'GET',
      params,
    })
    .then(helperUtils.parseApiResponse);

const getPackageNotes = ({ params, urlParams }) =>
  axios.auth
    .request({
      url: `/package/${urlParams.packageId}/learning-material/by-type/3`,
      method: 'GET',
      params,
    })
    .then((response) =>
      helperUtils.parseApiResponse(response, { returnArray: true }),
    );

const getFilterDataCstItemIds = ({ params, urlParams }) =>
  new Promise((resolve, reject) => {
    axios.auth
      .request({
        url: `/package/${urlParams.packageId}/learning-material/notes/filter-data/cst-item-ids`,
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

export { getPackageNotesCount, getPackageNotes, getFilterDataCstItemIds };
