import axios from 'axios'

export const registerUserService = (request) => {
  const REGISTER_API_ENDPOINT = 'http://localhost:8000/auth/signup';

  return axios({
      baseURL: REGISTER_API_ENDPOINT,
      method: 'POST',    
      data: request.user,
    })
  };

export const loginUserService = (request) => {
  const LOGIN_API_ENDPOINT = 'http://localhost:8000/auth/signin';
  
  return axios({
      baseURL: LOGIN_API_ENDPOINT,
      method: 'POST',    
      data: request.user,
    })
  };



export const getUserDataService = () => {
  const GETUSERDATA_API_ENDPOINT = 'http://localhost:8000/profile';
  return axios({
      baseURL: GETUSERDATA_API_ENDPOINT,
      method: 'get',    
    })
  };



  