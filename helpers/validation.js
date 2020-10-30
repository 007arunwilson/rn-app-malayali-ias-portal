const isValidEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const isValidPhone = (phone) => /^\d+$/.test(phone) && phone.length === 10;

const isValidPassword = (password) => password && password.length >= 6;

const isValidOTP = (otp) => /^\d+$/.test(otp) && otp.length === 5;

export { isValidEmail, isValidPhone, isValidOTP, isValidPassword };
