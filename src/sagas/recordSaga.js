import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';

import { 
  getRecordService,
  postRecordService,
  updateRecordService,
  deleteRecordService
} from '../services/recordService';

import * as types from '../actions/constant'

export function* getRecordSaga(payload) {
  try {
    const response = yield call(getRecordService, payload);
    yield [
      put({ type: types.GET_RECORDDATA_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: types.GET_RECORDDATA_ERROR, error });
  }
}

export function* postRecord(payload) {
  try {
    const response = yield call(postRecordService, payload);
    yield [
      put({ type: types.POST_RECORD_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: types.POST_RECORD_ERROR, error });
  }
}

export function* updateRecord(payload) {
  try {
    const response = yield call(updateRecordService, payload);
    yield [
      put({ type: types.UPDATE_RECORD_SUCCESS, response })
    ];
  } catch(error) {
    yield put({ type: types.UPDATE_RECORD_ERROR, error });
  }
}

export function* deleteRecord(payload) {

  try {
    yield call(deleteRecordService, payload);
    yield [
      put({ type: types.DELETE_RECORD_SUCCESS, payload })
    ];
  } catch(error) {
    yield put({ type: types.DELETE_RECORD_ERROR, error });
  }
}

export default function* watchRecord() {
  yield takeLatest(types.DELETE_RECORD, deleteRecord)
  yield takeLatest(types.UPDATE_RECORD, updateRecord)
	yield takeLatest(types.POST_RECORD, postRecord)
	yield takeLatest(types.GET_RECORDDATA, getRecordSaga)
}