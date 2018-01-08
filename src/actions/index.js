import * as consts from 'constants';

export const blockList = () => ({
  type: consts.BLOCK_LIST
});

export const blockClicked = payload => {
    return{
        type:consts.BLOCK_CLICKED,
        payload
        }
};
export const addBlockToProject = payload => ({
    type:consts.ADD_TO_PROJECT,
    payload
});
export const trackLocation = payload => ({
    type:consts.TRACK_LOCATION,
    payload
});
export const updateCurrentProject =payload =>({
    type:consts.UPDATE_CURRENT_PROJECT,
    payload
})

export const updateBlockValue = payload =>{
    return({
    type: consts.UPDATE_BLOCK,
    payload
})
}
