export const BLOCK_LIST = 'BLOCK_LIST';
export const BLOCK_CLICKED = 'BLOCK_CLICKED';
export const ADD_TO_PROJECT = 'ADD_TO_PROJECT';
export const TRACK_LOCATION ='TRACK_LOCATION';
export const UPDATE_BLOCK = 'UPDATE_BLOCK';
export const UPDATE_CURRENT_PROJECT = 'UPDATE_CURRENT_PROJECT';

export const blockList = () => ({
  type: BLOCK_LIST
});

export const blockClicked = payload => {
    delete payload.id;
    return{
        type:BLOCK_CLICKED,
        payload
        }
};
export const addBlockToProject = payload => ({
    type:ADD_TO_PROJECT,
    payload
});
export const trackLocation = payload => ({
    type:TRACK_LOCATION,
    payload
});
export const updateBlockValue = payload =>({
    type:UPDATE_BLOCK,
    payload
})
export const updateCurrentProject =payload =>({
    type:UPDATE_CURRENT_PROJECT,
    payload
})
