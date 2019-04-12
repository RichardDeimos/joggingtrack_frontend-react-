import { all } from 'redux-saga/effects';
import watchUserAuthentication from './authenticationSaga';
import watchRecord from './recordSaga';

export default function* startForman() {
    yield all([
  		watchUserAuthentication(),
  		watchRecord()
  	])
}