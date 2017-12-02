import {createSelector} from 'reselect';
import _ from 'lodash';

const blocksSelector = state => state.app.blocks.byId
const clickedBlockSelector = state => state.app.clickedBlock

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
