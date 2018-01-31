import {combineReducers} from 'redux';
import mainPage from '../src/components/MainPage/reducer';

import  orm  from '../src/components/MainPage/models';
import { createReducer} from 'redux-orm';

import { reducer as uiReducer } from 'redux-ui'

const rootReducer = combineReducers({
    orm: createReducer(orm),
    mainPage,
    ui : uiReducer
});

export default rootReducer;
