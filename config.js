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
  greyLight:'#D5D8DC',
  white: '#ffffff',
  shadowWhite: '#F0F3F4',
  dimWhite: '#F7F9F9',
  text: 'rgba(0,0,0,0.87)',
  textLight: '#616161',
  black: '#000000',
  fb: '#3b5998',
  greenDark: '#16A085',
  greenLight: '#25EAC3',
  redDark: '#C42020',
  redLight: '#FF2626',
  orangeDark: '#E67E22',
};
const config = {
  color,
  googleWebClientId: envConfig.GOOGLE_WEB_CLIENT_ID,
  facebookAppId: envConfig.FACEBOOK_APP_ID,
  apiOrigin: envConfig.API_ORIGIN,
  razorPaymentCurrency: envConfig.RAZOR_PAYMENT_CURRENCY,
  razorProductLogoUrl: envConfig.RAZOR_PRODUCT_LOGO_URL,
  instituteName: envConfig.INSTITUTE_NAME,
  instituteBranch: envConfig.INSTITUTE_BRANCH,
  env: envConfig.ENV,
};

export { color };
export default config;
