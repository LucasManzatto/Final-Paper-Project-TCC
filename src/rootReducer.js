import {combineReducers} from 'redux';
import sideBar from '../src/components/SideBar/reducer';
import projectArea from '../src/components/ProjectArea/reducer';

const rootReducer = combineReducers({
  sideBar,
  projectArea
});

export default rootReducer;
