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
        // case consts.LOGIN:
        //     return initialStateLogged;
        case consts.UPDATE_BLOCK:
            const {key,value,id} = action.payload;
            if(value <= 0){
                return state;
            }

            else{
                newState = update(state,{
                    [key]: {$set: value},
                    projects : {
                        [currentProject] : {
                            blocks : {
                                [id]: {
                                    [key]: {$set: value},
                                }
                            }
                        }
                    }
                });
                return newState;
            }

        case consts.BLOCK_UPDATED:
            return updateBlock(action.payload.block.id,'updated',action.payload.updated);

        case consts.UPDATE_CURRENT_PROJECT:
            return update(state, {
              currentProject: {$set: action.payload},
              clickedBlock: {$set: {}}
            });

        case consts.TRACK_LOCATION:
            return updateBlock(action.payload.block.id,'position',action.payload.deltaPosition);

        case consts.BLOCK_CLICKED:
            return update(state,{clickedBlock : {$set: action.payload}});

        case consts.PAUSE_BLOCK:
            return updateBlock(action.payload.block.id,'paused',!action.payload.block.paused);
        case consts.SELECT_LINK:
            return update(state,{
                    selectedLink : {$set : action.payload}
            })
        case consts.DELETE_LINK:
            block = state.projects[currentProject].blocks[state.selectedLink.id];
            const linkPosition = state.selectedLink.linkPosition;
            let linked = block.linked;
            //O block deve ter linked=false quando o numero de links for menor que o numero de links necessarios
            //Se o total de links menos 1 for igual a 0, quer dizer que o bloco não está mais linkado
            if(block.links.length-1 < block.neededLinks){
                linked = false;
            }
            newState = update(state,{
                projects : {
                    [currentProject] : {
                        blocks : {
                            [block.id]: {
                                links: arr => arr.filter(item => item != linkPosition),
                                linked : {$set: linked}
                            }
                        }
                    }
                }
            });
            return newState;
    }
}
