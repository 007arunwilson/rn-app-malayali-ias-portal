import * as types from '../types/masters';
import * as mastersApi from '../../services/masters';

const updateCstItemsByTypeValue = (payload) => (dispatch) =>
  dispatch({
    type: types.cstItemsByTypeValue,
    payload,
  });

const updateCstItemsByParentId = (payload) => (dispatch) =>
  dispatch({
    type: types.cstItemsByParentId,
    payload,
  });

const getCstItems = () => mastersApi.getCstItems();

const prepareDispatchObject = (result) => {
  const byTypeValue = {};
  const byParentId = {};

  result.forEach((element) => {
    if (!byTypeValue[element.type_value]) {
      byTypeValue[element.type_value] = [];
    }
    byTypeValue[element.type_value].push(element);

    if (!byParentId[element.parent_id === null ? 0 : element.parent_id]) {
      byParentId[element.parent_id === null ? 0 : element.parent_id] = [];
    }
    byParentId[element.parent_id === null ? 0 : element.parent_id].push(
      element,
    );
  });

  return { byTypeValue, byParentId };
};

export {
  updateCstItemsByTypeValue,
  updateCstItemsByParentId,
  getCstItems,
  prepareDispatchObject,
};
