import * as consts from '../constants';

export const blockList = () => ({
  type: consts.BLOCK_LIST
});
export const addBlockToProject = payload => ({
    type:consts.ADD_TO_PROJECT,
    payload
});
