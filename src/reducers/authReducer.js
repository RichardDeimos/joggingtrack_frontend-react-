import * as types from '../actions/constant';

let user = JSON.parse(localStorage.getItem('currentUser'))

const initialState = user ? {
	me: user.user,
	token: user.token,
	success: false,
	role: null,
} :{
  me: null,
  token: null,
  success: false,
  role: null,
}

export default function(state = initialState, action) {
  let response = action.response;
  switch(action.type) {
    case types.REGISTER_USER_SUCCESS:
      return { 
        ...state,
        success: true,
      };
    case types.REGISTER_USER_ERROR:
      return { 
        ...state,
        success: false,
      };
    case types.GET_USERDATA_SUCCESS:
      localStorage.setItem('currentUserRole', JSON.stringify(response))
      return { 
        ...state,
        role: response.data,
        success: true
      };
    case types.GET_USERDATA_ERROR:
      return { 
        ...state,
        success: false
      };
    case types.LOGIN_USER_SUCCESS:
      localStorage.setItem('currentUser', JSON.stringify(response.data))
      return { 
        ...state,
        me: response.data.user,
        token: response.data.token,
        success: true,
      };
    	
    case types.LOGIN_USER_ERROR:
      return { 
        ...state,
        success: false,
      };
    case types.LOG_OUT:
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentUserRole');
      return {
        ...state,
        me: null,
        token: null,
        role: null,
      }
    default:
      return state;
  }
}