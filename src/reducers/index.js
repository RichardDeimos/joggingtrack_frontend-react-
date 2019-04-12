import { combineReducers } from 'redux';
import auth from './authReducer';
import record from './recordReducer';

const rootReducer = combineReducers({
  auth,
  record
});

export default rootReducer;