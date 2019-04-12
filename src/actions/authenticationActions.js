import * as types from './constant';

export const registerUserAction = (user) => {
  return {
    type: types.REGISTER_USER,
    user
  }
};

export const loginUserAction = (user) => {
  return {
    type: types.LOGIN_USER,
    user
  }
};

export const getUserDataAction = (user) => {
  return {
    type: types.GET_USERDATA,
    user
  }
};

export const logOut = () => {
  return {
    type: types.LOG_OUT,
    payload: null,
  }
};

