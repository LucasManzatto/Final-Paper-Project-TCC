import * as consts from '../../constants';

export const blockClicked = payload => {
    return{
        type:consts.BLOCK_CLICKED,
        payload
        }
};
export const updateBlockValue = payload =>{
    return({
    type: consts.UPDATE_BLOCK,
    payload
})
}
