import * as consts from '../../constants';

export const updateCurrentProject =payload =>({
    type:consts.UPDATE_CURRENT_PROJECT,
    payload
})
export const trackLocation = payload => ({
    type:consts.TRACK_LOCATION,
    payload
});
