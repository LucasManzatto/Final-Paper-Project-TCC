import * as consts from '../../constants';

export const updateCurrentProject =payload =>({
    type:consts.UPDATE_CURRENT_PROJECT,
    payload
})
export const trackLocation = payload => ({
    type:consts.TRACK_LOCATION,
    payload
});
export const blockUpdated = payload => ({
    type:consts.BLOCK_UPDATED,
    payload
});
export const deleteLink= payload => ({
    type:consts.DELETE_LINK,
    payload
});
export const blockClicked = payload => ({
    type:consts.BLOCK_CLICKED,
    payload
});
export const selectLink = payload => ({
    type:consts.SELECT_LINK,
    payload
});

export const addBlockToProject = payload =>({
    type:consts.ADD_TO_PROJECT,
    payload

})
export const updateBlockValue = payload =>({
    type: consts.UPDATE_BLOCK,
    payload
})
export const updateDropDown = payload =>({
    type: consts.UPDATE_DROPDOWN,
    payload
})
export const pauseBlock = payload =>({
    type: consts.PAUSE_BLOCK,
    payload
})
export const updateData = payload =>({
    type : consts.UPDATE_DATA,
    payload
})
