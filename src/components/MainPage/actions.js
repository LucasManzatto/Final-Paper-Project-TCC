import * as consts from '../../constants';

export const updateCurrentProject =payload =>({
    type:consts.UPDATE_CURRENT_PROJECT,
    payload
})
export const trackLocation = payload => ({
    type:consts.TRACK_LOCATION,
    payload
});
export const trackAbsoluteLocation = payload => ({
    type:consts.TRACK_ABSOLUTE_LOCATION,
    payload
});

export const blockClicked = payload => ({
    type:consts.BLOCK_CLICKED,
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
