import * as consts from '../../constants';
import _ from 'lodash';
import update from 'immutability-helper';

import {initialState,initialStateLogged} from '../../initialState';

export default function reducer(state = initialState,action){
    let block,currentProject = state.currentProject,newState;

    const updateBlock = (id,key,value) =>{
        return update(state,{
            projects : {
                [currentProject] : {
                    blocks : {
                        [id]: {
                            [key]: {$set: value}
                        }
                    }
                }
            }
        });
    }

    switch(action.type){
        default:
            return state;
        case consts.LOGIN:
            return initialStateLogged;
        case consts.UPDATE_BLOCK:
            const {key,value,id} = action.payload;
            newState = update(state,{
                amplitude : {$set: value},
                projects : {
                    [currentProject] : {
                        blocks : {
                            [id]: {
                                [key]: {$set: value}
                            }
                        }
                    }
                }
            });
            return newState;
        case consts.UPDATE_CURRENT_PROJECT:
            newState = update(state, {
              currentProject: {$set: action.payload},
              clickedBlock: {$set: {}}
            });
            return newState;
        case consts.TRACK_LOCATION:
            block = action.payload.block;
            //newState = updateBlock(block.id,'position',action.payload.deltaPosition);
            return updateBlock(block.id,'position',action.payload.deltaPosition);;
        case consts.BLOCK_CLICKED:
            newState = update(state,{clickedBlock : {$set: action.payload}})
            return newState;
            //return {...state,clickedBlock : action.payload};
        case consts.PAUSE_BLOCK:
            block = action.payload;
            newState = updateBlock(block.id,'paused',!block.paused);
            return newState;
        case consts.DELETE_LINK:
            block = action.payload.block;
            const link = action.payload.link;
             const links = state.projects[currentProject].blocks[block.id].links.filter(item => item !== link);
            // if(_.isEmpty(links)){
            //     newState.projects[currentProject].blocks[block.id].links = links;
            //     newState.projects[currentProject].blocks[block.id].linked = false;
            // }
            // else{
            //     newState.projects[currentProject].blocks[block.id].links = links;
            // }
            // console.log(newState.projects[currentProject].blocks[block.id]);
            // return newState;
            return {...state,
                        projects: {
                            ...state.projects,
                            [currentProject]: {
                            ...state.projects[currentProject],
                            blocks : {
                                ...state.projects[currentProject].blocks,
                                [block.id] :{
                                    ...state.projects[currentProject].blocks[block.id],
                                    links : links,
                                    linked: false
                                }
                            }
                            }
                        }
                    }
    }
}
