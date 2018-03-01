import * as consts from '../../constants';
import _ from 'lodash';

import {initialState} from '../../initialState';

export default function reducer(state = initialState,action){
    let block,currentProject = state.currentProject,newState;
    switch(action.type){
        default:
            return state;
        case consts.UPDATE_BLOCK:
            const {key,value,id} = action.payload;
            block = _.clone(state.projects[currentProject].blocks[id]);
            block[key] = value;
            return {...state,
                      projects: {
                        ...state.projects,
                        [currentProject]: {
                          ...state.projects[currentProject],
                          blocks : {
                              ...state.projects[currentProject].blocks,
                          [id] : block
                          }
                        }
                    }
                }
        case consts.UPDATE_CURRENT_PROJECT:
            return {...state,currentProject : action.payload,clickedBlock : {}};
        case consts.TRACK_ABSOLUTE_LOCATION:
            block = action.payload.block;
            newState = _.clone(state);
            newState.projects[currentProject].blocks[block.id].absolutePosition = action.payload.deltaPosition;
            return newState;
        case consts.TRACK_LOCATION:
            block = action.payload.block;
            newState = _.clone(state);
            newState.projects[currentProject].blocks[block.id].position = action.payload.deltaPosition;
            return newState;
        case consts.BLOCK_CLICKED:
            return {...state,clickedBlock : action.payload};
        case consts.PAUSE_BLOCK:
            block = action.payload.block;
            newState = _.clone(state);
            newState.projects[currentProject].blocks[block.id].paused = !block.paused;
            return newState;
        // return {...state,
        //             projects: {
        //                 ...state.projects,
        //                 [currentProject]: {
        //                 ...state.projects[currentProject],
        //                 blocks : {
        //                     ...state.projects[currentProject].blocks,
        //                     [block.id] :{
        //                         ...state.projects[currentProject].blocks[block.id],
        //                     paused : !block.paused
        //                     }
        //                 }
        //                 }
        //             }
        //         }
    }
}
