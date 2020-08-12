import envConfig from 'react-native-config';
const color = {
  primary: '#202c45',
  primaryDark: '#00001e',
  primaryLight: '#4a5570',
  primaryText: '#ffffff',
  secondary: '#e8082d',
  secondaryDark: '#ad0005',
  secondaryLight: '#ff5757',
  secondaryText: '#ffffff',
  backgroundLight: '#EEEEEE',
  backgroundDark: '#E1E2E1',
  white: '#ffffff',
  text: '#616161',
  textLight: '#F5F5F6',
  black: '#000000',
  fb: '#3b5998',
};
const config = {
  color,
  googleWebClientId: envConfig.GOOGLE_WEB_CLIENT_ID,
  facebookAppId: envConfig.FACEBOOK_APP_ID,
  apiOrigin: envConfig.API_ORIGIN,
  razorPaymentCurrency: envConfig.RAZOR_PAYMENT_CURRENCY,
  razorApiKey: envConfig.RAZOR_API_KEY,
  razorProductLogoUrl: envConfig.RAZOR_PRODUCT_LOGO_URL,
  instituteName: envConfig.INSTITUTE_NAME,
  instituteBranch: envConfig.INSTITUTE_BRANCH,
};

export { color };
export default config;
