import {TRACK_LOCATION,
        BLOCK_LIST,
        BLOCK_CLICKED,
        ADD_TO_PROJECT,
        UPDATE_BLOCK
    } from '../actions/index';

import _ from 'lodash';

const initialState = {
    clickedBlock : {
        name: 'Bloco 1',
        Frequency :3,
        Amplitude :5,
    },
    projects : {
        byId : {
            "project1" :{
                id: 1,
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
                    }
                }
            },
            "project2" :{
                id: 2,
                name: "Project 2",
                blocks : {
                    "block3" :{
                        id : "block3",
                        position : {x:0 , y: 510},
                    },
                    "block4" :{
                        id : "block4",
                        position : {x:0 , y: 300},
                    }
                }
            }
        },
        allIds: ["project1","project2"]
    },
    blocks :{
        byId:{
            block1: {
                name: 'Bloco 1',
                id:'block1',
                Frequency :2,
                Amplitude :5,
            },
            block2: {
                name: 'Bloco 2',
                id:'block2',
                Frequency :8,
                Amplitude :4,
            },
            block3: {
                name: 'Bloco 3',
                id:'block3',
                Frequency :5,
                Amplitude :10,
            },
            block4: {
                name: 'Bloco 4',
                id:'block4',
                Frequency :3,
                Amplitude :8,
            },
        },
        allIds : ["block1","block2","block3","block4"]
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
                name: 'Bloco 1',
                Frequency :action.payload,
                Amplitude :5,
            }
            return {...state,clickedBlock : clickedBlock};
    }
}

const updateBlockPosition = (position,block,newState) => {
    newState.projects.byId.project1.blocks.block.position = position;
    return newState;
}

const getBlockById = (id,state) =>{
    return _.find(state.blocks.byId , {id})
}
