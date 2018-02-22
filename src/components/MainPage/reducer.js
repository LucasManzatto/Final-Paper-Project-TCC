import * as consts from '../../constants';
import _ from 'lodash';

const initialState = {
    currentProject : 0,
    clickedBlock : {
    },
    projects : {
        0 : {
            id: 0,
            name: "Project 1",
            blocks: {
                0: {
                    id:0,
                    name: 'RNG',
                    type: 'square',
                    samples :120,
                    position : {x:200 , y: 480},
                    paused : false,
                    binary : [0,1,0]
                },
                1:{
                    id:1,
                    name: 'Carrier Wave',
                    frequency: 4,
                    amplitude: 4,
                    type:'sine',
                    position : {x:0 , y: 300},
                    paused : false
                },
                2: {
                    id:2,
                    name: 'BPSK',
                    frequency: 4,
                    amplitude: 4,
                    type : 'bpsk',
                    position : {x:200, y: 120},
                    paused : false
                },
                3:{
                    id:3,
                    name: 'AWGN',
                    type: 'awgn',
                    position : {x:400 , y: 0},
                    paused : false
                }
            }
        },
        1: {
            id:1,
            name: "Project 2",
            blocks : {
                1:{
                    id:1,
                    name: 'Carrier Wave',
                    frequency: 4,
                    amplitude: 4,
                    type:'sine',
                    position : {x:0 , y: 300},
                    paused : false
                },
            }
        }
    },
    blocks: {
        0: {
            name: 'RNG',
            type: 'square',
            samples :120,
            position : {x:200 , y: 480},
            paused : false,
            binary : [0,1,0]
        },
        1:{
            name: 'Carrier Wave',
            frequency: 4,
            amplitude: 4,
            type:'sine',
            position : {x:0 , y: 300},
            paused : false
        },
        2: {
            name: 'BPSK',
            frequency: 4,
            amplitude: 4,
            type : 'bpsk',
            position : {x:200, y: 120},
            paused : false
        },
        3:{
            name: 'AWGN',
            type: 'awgn',
            position : {x:400 , y: 0},
            paused : false
        },
        blocksIds : [0,1,2,3]
    }
}

export default function reducerUI(state = initialState,action){
    let block,currentProject;
    switch(action.type){
        default:
            return state;
        case consts.UPDATE_BLOCK:
            const {key,value,id} = action.payload;
            currentProject = state.currentProject;
            //_.clone
            block = {...state.projects[currentProject].blocks[id]};
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
            break;
        case consts.BLOCK_CLICKED:
            return {...state,clickedBlock : action.payload};
        break;
        case consts.PAUSE_BLOCK:
        block = action.payload;
        currentProject = state.currentProject;

        //com lodash
        let newState = _.clone(state);
        newState.projects[currentProject].blocks[block.id].paused = !block.paused;
        return newState;
        //sem lodash
        return {...state,
                    projects: {
                        ...state.projects,
                        [currentProject]: {
                        ...state.projects[currentProject],
                        blocks : {
                            ...state.projects[currentProject].blocks,
                            [block.id] :{
                                ...state.projects[currentProject].blocks[block.id],
                            paused : !block.paused
                            }
                        }
                        }
                    }
                }
         }

    }
