import {TRACK_LOCATION,
        BLOCK_LIST,
        BLOCK_CLICKED,
        ADD_TO_PROJECT,
        UPDATE_BLOCK,
        UPDATE_CURRENT_PROJECT
    } from '../actions/index';

import _ from 'lodash';

const initialState = {
    clickedBlock : {
        name: 'Bloco 1',
        Frequency :3,
        Amplitude :5,
    },
    currentProject : "project2",
    projects : {
        byId : {
            "project1" :{
                id: 'project1',
                name: "Project 1",
                blocks : ["block1","block2"],
                blocks : {
                    "block1" :{
                        id : "block1",
                        position : {x:0 , y: 530},
                    },
                    "block2" :{
                        id : "block2",
                        position : {x:0 , y: 300},
                    },
                    "block3" :{
                        id : "block3",
                        position : {x:200, y: 100},
                    }
                }
            },
            "project2" :{
                id: 'project2',
                name: "Project 2",
                blocks : {
                    "block3" :{
                        id : "block3",
                        position : {x:0 , y: 510},
                    },
                }
            }
        },
        allIds: ["project1","project2"]
    },
    blocks :{
        byId:{
            block1: {
                name: 'Random Number Generator',
                id:'block1',
                Frequency :2,
                Amplitude :5,
            },
            block2: {
                name: 'Carrier Wave',
                id:'block2',
                Frequency :8,
                Amplitude :4,
            },
            block3: {
                name: 'BPSK',
                id:'block3',
                Frequency :5,
                Amplitude :10,
            },
        },
        allIds : ["block1","block2","block3"]
    }
}

export default function(state = initialState,action){
    let newState = state;
    switch(action.type){
        default:
            return state;
        case BLOCK_LIST:
            return initialState;
        case BLOCK_CLICKED:
            return {...state,clickedBlock:action.payload};
        case ADD_TO_PROJECT:
            const block = getBlockById(action.payload,state);
            return {...state,projectBlocks:block}
        case TRACK_LOCATION:
            newState.projects.byId.project1.blocks.block1.position = action.payload;
            return {...state,newState};
        case UPDATE_BLOCK:
            const clickedBlock = {
                name: 'Random Number Generator',
                Frequency :action.payload,
                Amplitude :5,
            }
            return {...state,clickedBlock : clickedBlock};
        case UPDATE_CURRENT_PROJECT:
            return {...state,currentProject : action.payload};
    }
}

const updateBlockPosition = (position,block,newState) => {
    newState.projects.byId.project1.blocks.block.position = position;
    return newState;
}

const getBlockById = (id,state) =>{
    return _.find(state.blocks.byId , {id})
}
