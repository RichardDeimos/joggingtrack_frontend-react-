import { fork } from 'redux-saga/effects';
import watchUserAuthentication from './authenticationSaga';

export default function* startForman() {
  yield fork(watchUserAuthentication);
}
