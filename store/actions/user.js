import * as userApi from '../../services/user';
import * as types from '../types/user';

const update = (payload) => (dispatch) =>
  dispatch({
    type: types.update,
    payload,
  });

const createUser = ({ email, phone, password }) =>
  userApi.createUser({ data: { email, phone, password } });

const updateUserProfile = ({ name, email, phone, password }) =>
  userApi.updateUser({
    data: { email, phone, password, profile_fields: { name } },
  });

const updateActiveSubscriptionsByIndex = (payload) => (dispatch) =>
  dispatch({
    type: types.activeSubscriptionsByIndex,
    payload,
  });

const updateActiveSubscriptionsLoading = (payload) => (dispatch) =>
  dispatch({
    type: types.activeSubscriptionsLoading,
    payload,
  });

const enrollToDefaultPackage = () => userApi.enrollToDefaultPackage();

export {
  update,
  createUser,
  updateUserProfile,
  enrollToDefaultPackage,
  updateActiveSubscriptionsByIndex,
  updateActiveSubscriptionsLoading,
};
