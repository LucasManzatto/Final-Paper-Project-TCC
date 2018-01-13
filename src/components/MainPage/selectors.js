//import {createSelector} from 'reselect';
import { createSelector } from 'redux-orm';

//redux-orm
import  orm  from '../MainPage/models';

import _ from 'lodash';

const dbStateSelector = state => state.db;
export const blocksSelector = createSelector(
    orm,
    // The first input selector should always select the db-state.
    // Behind the scenes, `createSelector` begins a Redux-ORM session
    // with the value returned by `dbStateSelector` and passes
    // that Session instance as an argument instead.
    dbStateSelector,
    session => {
        console.log(session.Project.all().toModelArray());
        return session.Block.toModelArray();
        }
);
//
// const blocksSelector = state => state.mainPage.blocks.byId
// const clickedBlockSelector = state => state.mainPage.clickedBlock
//
// const getSelectedBlock = (blocks,clickedBlock) =>{
//     const getBlock = _.find(
//         blocks,
//         clickedBlock)
//     return getBlock;
// }
//
// export default createSelector(
//     blocksSelector,
//     clickedBlockSelector,
//     getSelectedBlock
// );
