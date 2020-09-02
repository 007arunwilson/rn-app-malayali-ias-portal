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

const createStudentProfile = ({ courseId }) =>
  userApi.createStudentProfile({ data: { course_cst_item_id: courseId } });

export { update, createUser, updateUserProfile, createStudentProfile };
