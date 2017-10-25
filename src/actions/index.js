export const BLOCK_LIST = 'BLOCK_LIST';
export const BLOCK_CLICKED = 'BLOCK_CLICKED';
export const ADD_TO_PROJECT = 'ADD_TO_PROJECT';
export const TRACK_LOCATION ='TRACK_LOCATION';

export const blockList = () => ({
  type: BLOCK_LIST
});

export const blockClicked = payload => ({
    type:BLOCK_CLICKED,
    payload
})
export const addBlockToProject = payload => ({
    type:ADD_TO_PROJECT,
    payload
});
export const trackLocation = payload => ({
    type:TRACK_LOCATION,
    payload
});
