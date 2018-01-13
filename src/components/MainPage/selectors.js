import {createSelector} from 'reselect';
import orm from './orm';
import _ from 'lodash';

const blocksSelector = state => state.mainPage.blocks.byId
const clickedBlockSelector = state => state.mainPage.clickedBlock

const getSelectedBlock = (blocks,clickedBlock) =>{
    const getBlock = _.find(
        blocks,
        clickedBlock)
    return getBlock;
}

export default createSelector(
    blocksSelector,
    clickedBlockSelector,
    getSelectedBlock
);
