import axios from 'axios'
 
if (localStorage.getItem('currentUser')) {
  axios.defaults.headers.common['Authorization'] = `jwt ${JSON.parse(localStorage.getItem('currentUser')).token}`;
}

const GET_RECORD_ENDPOINT = 'http://localhost:8000/records/';

export const getRecordService = (request) => {

  return axios({
      baseURL: GET_RECORD_ENDPOINT,
      method: 'GET',    
      params: request.filter,
    })
  };

export const postRecordService = (request) => {
  const POST_RECORD_ENDPOINT = 'http://localhost:8000/records/';
  
  return axios({
      baseURL: POST_RECORD_ENDPOINT,
      method: 'POST',    
      data: request.record,
    })
  };

export const deleteRecordService = (request) => {
  const DELETE_RECORD_ENDPOINT = `http://localhost:8000/records/${request.record.id}/`;
  console.log(request.record)
  return axios({
      baseURL: DELETE_RECORD_ENDPOINT,
      method: 'DELETE', 
      data: request.record,   
    })
  };

export const updateRecordService = (request) => {
  const UPDATE_RECORD_ENDPOINT = `http://localhost:8000/records/${request.record.id}/`;

  return axios({
      baseURL: UPDATE_RECORD_ENDPOINT,
      method: 'PUT',    
      data: request.record,
    })
  };
