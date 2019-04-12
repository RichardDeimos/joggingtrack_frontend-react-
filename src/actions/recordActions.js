import * as types from './constant';

export const getRecordData = (filter) => {
  return {
    type: types.GET_RECORDDATA,
    filter
  }
};

export const postRecord = (record) => {
  return {
    type: types.POST_RECORD,
    record
  }
};

export const updateRecord = (record) => {
  return {
    type: types.UPDATE_RECORD,
    record
  }
};

export const deleteRecord = (record) => {
  return {
    type: types.DELETE_RECORD,
    record
  }
};