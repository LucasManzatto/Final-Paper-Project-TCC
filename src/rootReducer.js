import {combineReducers} from 'redux';
import mainPage from '../src/components/MainPage/reducer';

const rootReducer = combineReducers({
    //orm: createReducer(orm),
    mainPage,
});

export default rootReducer;
