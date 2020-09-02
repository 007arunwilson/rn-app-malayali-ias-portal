import * as authModel from '../../database/models/auth';
import * as userAPi from '../../services/user';
import * as authAPi from '../../services/auth';
import * as userActions from '../actions/user';
import * as appActions from '../actions/app';
import { Navigation } from 'react-native-navigation';
import { navComponents } from '../../navigation';

/** Update auth tokens to global variable and persistant storage */
const updateTokens = ({ accessToken, refreshToken }) =>
  new Promise((resolve) => {
    updateTokensToGlobal({ accessToken, refreshToken });
    authModel.saveTokens({ accessToken, refreshToken }).then(resolve);
  });

/** Delete auth tokens from global variable and persistant storage */
const deleteTokens = () =>
  new Promise((resolve) => {
    deleteTokensFromGlobal();
    authModel.deleteTokens().then(resolve);
  });

const updateTokensToGlobal = ({ accessToken, refreshToken }) => {
  global.accessToken = accessToken;
  global.refreshToken = refreshToken;
};

const deleteTokensFromGlobal = () => {
  global.accessToken = null;
  global.refreshToken = null;
};

const login = ({ email_or_phone_or_username, password }) =>
  authAPi.login({
    data: { email_or_phone_or_username, password },
  });

/**
 * process login action,
 * ( from different scenarios, from onabording, signin )
 * */
const processLogin = (payload) => (dispatch) => {
  new Promise((resolve) => {
    if (payload && payload.user && payload.studentProfile) {
      resolve({ user: payload.user, studentProfile: payload.studentProfile });
    } else {
      Promise.all([userAPi.getUser(), userAPi.getStudentProfile()]).then(
        ([user, studentProfile]) => {
          console.log('1');
          resolve({ user, studentProfile });
        },
      );
    }
  }).then(({ user, studentProfile }) => {
    const userObj = {
      email: user.email,
      phone: user.phone,
      name:
        user.profile_fields && user.profile_fields.name
          ? user.profile_fields.name
          : null,
      studentProfile: {
        courseId: studentProfile.course_cst_item_id,
        paid: false,
      },
    };
    dispatch(userActions.update(userObj));
    dispatch(
      appActions.updateSubjectsFromCourse(studentProfile.course_cst_item_id),
    );
    //Get subscribed subjects
    dispatch(appActions.updateActiveSubscptionSubjects());

    Navigation.setRoot({ root: navComponents.home });
  });
};

export {
  updateTokens,
  updateTokensToGlobal,
  processLogin,
  deleteTokens,
  login,
};
