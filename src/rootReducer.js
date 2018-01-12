import {combineReducers} from 'redux';
import mainPage from '../src/components/MainPage/reducer';

import { orm } from '../src/components/MainPage/models';
import { createReducer} from 'redux-orm';

const rootReducer = combineReducers({
    orm: createReducer(orm),
    mainPage
});

export default rootReducer;
