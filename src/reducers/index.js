import { combineReducers } from 'redux';
import TestReducer from './TestReducers';
import InitialDataReducer from './InitialDataReducers';

export default combineReducers({
    InitialData: InitialDataReducer,
    TestDataReducer: TestReducer
});