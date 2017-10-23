export const BLOCK_LIST = 'BLOCK_LIST';
export const INITIAL_STATE = 'INITIAL_STATE';
export const BLOCK_CLICKED = 'BLOCK_CLICKED';


export const blockList = () => ({
  type: BLOCK_LIST
});

export const initialState = () =>({
    type: INITIAL_STATE
})

export const blockClicked = payload => ({
    type:BLOCK_CLICKED,
    payload
})
