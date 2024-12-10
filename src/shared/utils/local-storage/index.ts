import { ChangePasswordData, OtpDuration, RegistrationData } from 'src/domains/auth/entity';

const constant = {
  token: 'rx_token',
  registrationData: 'rx_registration_data',
  otpDuration: 'rx_otp_duration',
  changePasswordData: 'rx_change_password_data',
  phoneNumberData: 'rx_phone_number',
};

export const setToken = (value: string) => {
  return localStorage.setItem(constant.token, value);
};

export const getToken = () => {
  return localStorage.getItem(constant.token);
};

export const deleteToken = () => {
  localStorage.removeItem(constant.token);
};

export const setRegistrationData = (data: RegistrationData) => {
  return localStorage.setItem(constant.registrationData, JSON.stringify(data));
};

export const getRegistrationData = (): RegistrationData | null => {
  const data = localStorage.getItem(constant.registrationData);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const appendRegistrationData = (data: RegistrationData) => {
  const registrationData = getRegistrationData();
  if (registrationData) {
    setRegistrationData({
      ...registrationData,
      ...data,
    });
  } else {
    setRegistrationData({
      ...data,
    });
  }
};

export const deleteRegistrationData = () => {
  localStorage.removeItem(constant.registrationData);
};

export const setOtpDuration = (duration: OtpDuration) => {
  localStorage.setItem(constant.otpDuration, JSON.stringify(duration));
};

export const getOtpDuration = (): OtpDuration | null => {
  const duration = localStorage.getItem(constant.otpDuration);
  if (duration) {
    return JSON.parse(duration);
  }
  return null;
};

export const appendOtpDuration = (duration: OtpDuration) => {
  const durationData = getOtpDuration();
  if (durationData) {
    setOtpDuration({
      ...durationData,
      ...duration,
    });
  } else {
    setOtpDuration({
      ...duration,
    });
  }
};

export const deleteOtpDuration = () => {
  localStorage.removeItem(constant.otpDuration);
};

export const setChangePasswordData = (value: ChangePasswordData) => {
  return localStorage.setItem(constant.changePasswordData, JSON.stringify(value));
};

export const getChangePasswordData = (): ChangePasswordData | null => {
  const data = localStorage.getItem(constant.changePasswordData);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const deleteChangePasswordData = () => {
  localStorage.removeItem(constant.changePasswordData);
};

export const setPhoneNumber = (value: string) => {
  return localStorage.setItem(constant.phoneNumberData, value);
};

export const getPhoneNumber = () => {
  return localStorage.getItem(constant.phoneNumberData);
};

export const deleteLoginData = () => {
  localStorage.removeItem(constant.phoneNumberData);
};
