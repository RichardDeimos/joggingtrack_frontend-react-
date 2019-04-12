import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';
import { 
  registerUserService,
  loginUserService,
  getUserDataService,
} from '../services/authenticationService';

import * as types from '../actions/constant'

export function* registerSaga(payload) {
  try {
    const response = yield call(registerUserService, payload);
    yield [
      put({ type: types.REGISTER_USER_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: types.REGISTER_USER_ERROR, error });
  }
}

export function* loginSaga(payload) {
  try {
    const response = yield call(loginUserService, payload);
    yield [
      put({ type: types.LOGIN_USER_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: types.LOGIN_USER_ERROR, error })
  }
}

export function* getUserSaga(payload) {
  try {
    const response = yield call(getUserDataService, payload);
    yield [
      put({ type: types.GET_USERDATA_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: types.GET_USERDATA_ERROR, error });
  }
}

export default function* watchUserAuthentication() {
  yield takeLatest(types.GET_USERDATA, getUserSaga);
  yield takeLatest(types.REGISTER_USER, registerSaga);
  yield takeLatest(types.LOGIN_USER, loginSaga);
}