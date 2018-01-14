//import {createSelector} from 'reselect';
import { createSelector } from 'redux-orm';

//redux-orm
import  orm  from '../MainPage/models';

import _ from 'lodash';

const dbStateSelector = state => state.db;

export const blocksSelector = createSelector(orm, state =>
    state.orm, session => {
    return session.Block.all().toRefArray();
});
export const projectsSelector = createSelector(orm, state =>
    state.orm, session => {
    return session.Project.all().toModelArray().map(project =>{
        return {...project, blocks : project.blocks.all().toRefArray()}
    });
});
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
