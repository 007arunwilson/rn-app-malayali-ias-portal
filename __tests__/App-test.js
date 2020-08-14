/**
 * @format
 */

import 'react-native';
// import React from 'react';

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';
import auth from '../helpers/axios/auth';
import * as authApi from '../services/auth';

it('refreshing session', () => {
  const data = {
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTk5Mjk1MTIsImRhdGEiOnsidXNlcklkIjozOSwidXNlclJvbGVzIjpbIkFETUlOIl19LCJpYXQiOjE1OTczMzc1MTJ9.HzkkRSv6ehlxpzbk2v8BoxNDeJpAFwEUVbOySunaXRk',
  };
  authApi.refreshSession(data);
  // return true;
});
