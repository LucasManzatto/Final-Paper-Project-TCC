import {combineReducers} from 'redux';
import AppReducer from './reducer';

const rootReducer = combineReducers({
  app: AppReducer
});

export default rootReducer;
