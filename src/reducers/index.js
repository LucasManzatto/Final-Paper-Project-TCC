import {combineReducers} from 'redux';
import AppReducer from './reducer';
import sideBar from '../../src/components/SideBar/reducer';

const rootReducer = combineReducers({
  app: AppReducer,
  sideBar
});

export default rootReducer;
