import * as types from '../actions/constant';
import { reject } from 'lodash';

const initialState = {
  record: {},
  records: [],
  success: false,
  page:{
    count: 1,
    next: null,
    previous: null,
    results: [],
    page_size: 5,
    page: 1,
  }
}

export default function(state = initialState, action) {
  let response = action.response
  switch(action.type) {
    case types.POST_RECORD_SUCCESS:
      return { 
        ...state, 
        record: response.data, 
        // records: [...state.records, response.data],
        success: true, 
      };
    case types.POST_RECORD_ERROR:
      return { 
        ...state,
        record: null,
        success: false,
      };
    case types.DELETE_RECORD_SUCCESS:
      console.log(action)
      return { 
        ...state, 
        records: reject(state.records, {id: action.payload.record.id}),
        success: true, 
      };
    case types.DELETE_RECORD_ERROR:
      return { 
        ...state,
        record: null,
        success: false,
      };
    case types.UPDATE_RECORD_SUCCESS:
      let updated_records = state.records.map(record => {
        var returnValue = {...record};
        if (record.id === response.data.id) {
          returnValue.distance = response.data.distance;
          returnValue.time = response.data.time;
          returnValue.date = response.data.date;
        }
        return returnValue
      })
      return { 
        ...state, 
        records: updated_records,
        success: true, 
      };
    case types.UPDATE_RECORD_ERROR:
      return { 
        ...state,
        record: null,
        success: false,
      };
    case types.GET_RECORDDATA_SUCCESS:
      return { 
        ...state, 
        records: response.data.results,
        page: {
          ...state.page,
          ...response.data
        },
        success: true,
      };
    case types.GET_RECORDDATA_ERROR:
      return { 
        ...state,
        records: [],
        success: false,
      };
    default:
      return state;
  }
}